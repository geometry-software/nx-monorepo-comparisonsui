import PDFDocument from 'pdfkit';
import type { CorrelationInsightPdfModel, CorrelationInsightPdfPair } from './correlation-insight-pdf.model.js';

const margin = 42;
const colors = {
  ink: '#000000',
  muted: '#808080',
  border: '#D3D3D3',
  primary: '#E9967A',
  positive: '#228B22',
} as const;

function shortText(value: string, limit: number): string {
  return value.length > limit ? `${value.slice(0, limit - 1)}…` : value;
}

function normalize(values: number[]): number[] {
  if (!values.length) return [];
  const minimum = values.reduce((current, value) => Math.min(current, value), Infinity);
  const maximum = values.reduce((current, value) => Math.max(current, value), -Infinity);
  const range = maximum - minimum || 1;
  return values.map((value) => (value - minimum) / range);
}

export class CorrelationInsightPdfProvider {
  async create(model: CorrelationInsightPdfModel): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      const document = new PDFDocument({ size: 'A4', margin, bufferPages: true });
      const chunks: Buffer[] = [];
      document.on('data', (chunk: Buffer) => chunks.push(chunk));
      document.on('error', reject);
      document.on('end', () => resolve(Buffer.concat(chunks)));
      try {
        this.render(document, model);
        this.addFooters(document);
        document.end();
      } catch (error) {
        document.destroy(error instanceof Error ? error : new Error('Unable to render correlation insight PDF.'));
        reject(error);
      }
    });
  }

  private ensureSpace(document: PDFKit.PDFDocument, y: number, height: number): number {
    if (y + height > document.page.height - margin - 30) {
      document.addPage();
      return margin;
    }
    return y;
  }

  private render(document: PDFKit.PDFDocument, model: CorrelationInsightPdfModel): void {
    const width = document.page.width - margin * 2;
    let y = margin;
    document.font('Helvetica-Bold').fontSize(22).fillColor(colors.ink)
      .text('Correlation Insights', margin, y, { width });
    y += 36;
    document.font('Helvetica').fontSize(9).fillColor(colors.muted)
      .text(`${model.provider} · ${model.createdAt.toLocaleString()}`, margin, y, { width });
    y += 27;
    y = this.generalInfo(document, y, width, model);
    y = this.matrix(document, y + 20, width, model.pairs);
    for (const pair of model.pairs) y = this.pairChart(document, y + 18, width, pair);
  }

  private generalInfo(document: PDFKit.PDFDocument, startY: number, width: number, model: CorrelationInsightPdfModel): number {
    let y = this.ensureSpace(document, startY, 120);
    document.font('Helvetica-Bold').fontSize(15).fillColor(colors.ink)
      .text('General Info', margin, y, { width });
    y += 27;
    const columnWidth = (width - 16) / 2;
    document.font('Helvetica-Bold').fontSize(8).fillColor(colors.muted)
      .text('LABEL', margin, y, { width: columnWidth })
      .text('DESCRIPTION', margin + columnWidth + 16, y, { width: columnWidth });
    y += 15;
    const labelHeight = document.font('Helvetica-Bold').fontSize(14).heightOfString(model.label, { width: columnWidth });
    const descriptionHeight = document.font('Helvetica').fontSize(9).heightOfString(model.description || 'No description provided.', { width: columnWidth });
    document.font('Helvetica-Bold').fontSize(14).fillColor(colors.ink)
      .text(model.label, margin, y, { width: columnWidth });
    document.font('Helvetica').fontSize(9)
      .text(model.description || 'No description provided.', margin + columnWidth + 16, y, { width: columnWidth });
    y += Math.max(labelHeight, descriptionHeight) + 18;
    y = this.ensureSpace(document, y, 75);
    document.strokeColor(colors.border).lineWidth(0.5).moveTo(margin, y).lineTo(margin + width, y).stroke();
    y += 12;
    const elementsCompared = model.pairs.reduce((total, pair) => total + pair.observationCount, 0);
    document.font('Helvetica-Bold').fontSize(8).fillColor(colors.muted)
      .text('SOURCE PAIRS', margin, y, { width: columnWidth })
      .text('ELEMENTS COMPARED', margin + columnWidth + 16, y, { width: columnWidth });
    y += 16;
    document.font('Helvetica-Bold').fontSize(18).fillColor(colors.ink)
      .text(String(model.pairs.length), margin, y, { width: columnWidth })
      .text(String(elementsCompared), margin + columnWidth + 16, y, { width: columnWidth });
    y += 38;
    y = this.ensureSpace(document, y, 55);
    document.font('Helvetica-Bold').fontSize(8).fillColor(colors.muted)
      .text('STRONGEST RELATIONSHIPS', margin, y, { width });
    y += 17;
    const sorted = [...model.pairs].sort((a, b) =>
      (b.r === null ? -1 : Math.abs(b.r)) - (a.r === null ? -1 : Math.abs(a.r)));
    for (const pair of sorted) {
      y = this.ensureSpace(document, y, 23);
      document.font('Helvetica').fontSize(9).fillColor(colors.ink)
        .text(shortText(`${pair.sourceA}  ·  ${pair.sourceB}`, 75), margin, y, { width: width - 85, lineBreak: false });
      document.font('Helvetica-Bold').text(pair.r?.toFixed(4) ?? '—', margin + width - 80, y, { width: 80, align: 'right', lineBreak: false });
      y += 21;
    }
    return y;
  }

  private matrix(document: PDFKit.PDFDocument, startY: number, width: number, pairs: CorrelationInsightPdfPair[]): number {
    const entities = [...new Set(pairs.flatMap(({ sourceA, sourceB }) => [sourceA, sourceB]))];
    let y = this.ensureSpace(document, startY, 75);
    document.font('Helvetica-Bold').fontSize(15).fillColor(colors.ink)
      .text('Correlation Matrix', margin, y, { width });
    y += 22;
    document.font('Helvetica').fontSize(8).fillColor(colors.muted)
      .text('Green is positive; primary is negative.', margin, y, { width });
    y += 22;
    if (!entities.length) return y;
    const labelWidth = Math.min(100, width * 0.2);
    const cellWidth = (width - labelWidth) / entities.length;
    const rowHeight = Math.min(34, Math.max(18, cellWidth));
    const drawHeader = () => {
      document.font('Helvetica-Bold').fontSize(6.5).fillColor(colors.muted);
      entities.forEach((entity, index) => document.text(shortText(entity, Math.max(5, Math.floor(cellWidth / 4))), margin + labelWidth + index * cellWidth, y, { width: cellWidth, align: 'center', lineBreak: false }));
      y += 20;
    };
    drawHeader();
    for (const row of entities) {
      if (y + rowHeight > document.page.height - margin - 30) {
        document.addPage();
        y = margin;
        drawHeader();
      }
      document.font('Helvetica-Bold').fontSize(7).fillColor(colors.ink)
        .text(shortText(row, 18), margin, y + rowHeight / 2 - 4, { width: labelWidth - 5, lineBreak: false });
      entities.forEach((column, index) => {
        const value = row === column ? 1 : pairs.find((pair) =>
          (pair.sourceA === row && pair.sourceB === column) || (pair.sourceA === column && pair.sourceB === row))?.r ?? null;
        const x = margin + labelWidth + index * cellWidth;
        const intensity = value === null ? 0.06 : 0.15 + Math.abs(value) * 0.7;
        document.roundedRect(x + 1, y + 1, Math.max(4, cellWidth - 3), rowHeight - 3, 3)
          .fillColor(value !== null && value < 0 ? colors.primary : colors.positive)
          .fillOpacity(intensity).fill().fillOpacity(1);
        document.font('Helvetica').fontSize(cellWidth < 25 ? 6 : 8).fillColor(colors.ink)
          .text(value?.toFixed(2) ?? '—', x + 1, y + rowHeight / 2 - 5, { width: cellWidth - 3, align: 'center', lineBreak: false });
      });
      y += rowHeight + 2;
    }
    return y;
  }

  private pairChart(document: PDFKit.PDFDocument, startY: number, width: number, pair: CorrelationInsightPdfPair): number {
    const y = this.ensureSpace(document, startY, 220);
    document.font('Helvetica-Bold').fontSize(12).fillColor(colors.ink)
      .text(shortText(`${pair.sourceA} and ${pair.sourceB}`, 80), margin, y, { width });
    document.font('Helvetica').fontSize(8).fillColor(colors.muted)
      .text(`Pearson R: ${pair.r?.toFixed(4) ?? '—'}  ·  ${pair.observationCount} shared periods`, margin, y + 18, { width });
    const plotX = margin + 18;
    const plotY = y + 45;
    const plotWidth = width - 36;
    const plotHeight = 105;
    document.strokeColor(colors.border).lineWidth(0.5)
      .moveTo(plotX, plotY + plotHeight).lineTo(plotX + plotWidth, plotY + plotHeight).stroke();
    if (pair.periods.length) {
      const series = [
        { label: pair.sourceA, values: normalize(pair.sourceAValues), color: colors.positive },
        { label: pair.sourceB, values: normalize(pair.sourceBValues), color: colors.primary },
      ];
      for (const item of series) {
        document.strokeColor(item.color).lineWidth(2);
        item.values.forEach((value, index) => {
          const x = plotX + (item.values.length === 1 ? plotWidth / 2 : index / (item.values.length - 1) * plotWidth);
          const pointY = plotY + (1 - value) * plotHeight;
          if (index === 0) document.moveTo(x, pointY);
          else document.lineTo(x, pointY);
        });
        if (item.values.length) document.stroke();
      }
      document.font('Helvetica').fontSize(7).fillColor(colors.muted)
        .text(shortText(pair.periods[0], 25), plotX, plotY + plotHeight + 7, { width: plotWidth / 2, lineBreak: false })
        .text(shortText(pair.periods.at(-1) ?? '', 25), plotX + plotWidth / 2, plotY + plotHeight + 7, { width: plotWidth / 2, align: 'right', lineBreak: false });
      series.forEach((item, index) => {
        const legendX = margin + index * width / 2;
        document.circle(legendX + 4, y + 183, 3).fill(item.color);
        document.font('Helvetica').fontSize(8).fillColor(colors.ink)
          .text(shortText(item.label, 34), legendX + 12, y + 177, { width: width / 2 - 16, lineBreak: false });
      });
    } else {
      document.font('Helvetica').fontSize(9).fillColor(colors.muted)
        .text('No shared periods for this source pair.', plotX, plotY + 45, { width: plotWidth, align: 'center' });
    }
    return y + 205;
  }

  private addFooters(document: PDFKit.PDFDocument): void {
    const pages = document.bufferedPageRange();
    for (let index = pages.start; index < pages.start + pages.count; index += 1) {
      document.switchToPage(index);
      const y = document.page.height - margin - 20;
      document.strokeColor(colors.border).lineWidth(0.5)
        .moveTo(margin, y - 8).lineTo(document.page.width - margin, y - 8).stroke();
      document.font('Helvetica').fontSize(8).fillColor(colors.muted)
        .text('Correlation Insights', margin, y, { width: 220, lineBreak: false })
        .text(`${index - pages.start + 1} / ${pages.count}`, document.page.width - margin - 50, y, { width: 50, align: 'right', lineBreak: false });
    }
  }
}
