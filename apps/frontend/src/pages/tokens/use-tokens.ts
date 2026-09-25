import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { useI18n } from "../../app/i18n";
import { createToken, listTokens, updateToken, type SessionToken } from "../../services/tokens";

export type TokenSort = 'sessionId' | 'token' | 'provider' | 'createdAt' | 'verifiedAt' | 'closedAt';
export type TokenRow = SessionToken & { id: string };

export function useTokens() {
  const { language, t: translate } = useI18n();
  const [tokens, setTokens] = useState<SessionToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<TokenSort>('createdAt');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [editTarget, setEditTarget] = useState<SessionToken | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [verifiedAt, setVerifiedAt] = useState<string | null>(null);
  const [closedAt, setClosedAt] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      setTokens(await listTokens());
    } catch (cause) {
      setLoadError(messageOf(cause));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return tokens
      .filter((token) => !term || [
        String(token.sessionId), token.token, token.provider,
      ].some((value) => value.toLowerCase().includes(term)))
      .sort((left, right) => {
        const result = sort === 'sessionId'
          ? left.sessionId - right.sessionId
          : String(left[sort] ?? '').localeCompare(String(right[sort] ?? ''));
        return order === 'asc' ? result : -result;
      });
  }, [tokens, search, sort, order]);
  const pages = Math.max(1, Math.ceil(filtered.length / limit));
  const rows: TokenRow[] = filtered.slice((page - 1) * limit, page * limit)
    .map((token) => ({ ...token, id: String(token.sessionId) }));

  useEffect(() => {
    if (page > pages) setPage(pages);
  }, [page, pages]);

  function changeQuery(change: () => void) {
    change();
    setPage(1);
  }

  function openDialog(target: SessionToken | null) {
    setEditTarget(target);
    setVerifiedAt(target?.verifiedAt ?? null);
    setClosedAt(target?.closedAt ?? null);
    setError('');
    setDialogOpen(true);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = editTarget ? null : new FormData(event.currentTarget);
    const token = String(form?.get('token') ?? '').trim();
    const provider = String(form?.get('provider') ?? '').trim();
    if (!editTarget && (!token || !provider)) {
      setError('Token and provider are required.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const saved = editTarget
        ? await updateToken(editTarget.sessionId, { verifiedAt, closedAt })
        : await createToken({ token, provider });
      setTokens((current) => editTarget
        ? current.map((entry) => entry.sessionId === saved.sessionId ? saved : entry)
        : [saved, ...current]);
      setNotice(editTarget ? `Session ${saved.sessionId} was updated.` : `Session ${saved.sessionId} was added.`);
      setDialogOpen(false);
    } catch (cause) {
      setError(messageOf(cause));
    } finally {
      setBusy(false);
    }
  }

  return {
    language, translate, loading, loadError, load, search, setSearch, sort, setSort,
    order, setOrder, page, setPage, limit, setLimit, editTarget, dialogOpen,
    setDialogOpen, verifiedAt, setVerifiedAt, closedAt, setClosedAt, busy,
    error, notice, setNotice, rows, pages, total: filtered.length,
    changeQuery, openDialog, submit,
  };
}

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : 'Token request failed';
}
