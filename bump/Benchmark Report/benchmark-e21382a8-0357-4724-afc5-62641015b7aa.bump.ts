export const bump = {
  "meta": {
    "report": "benchmark-group",
    "modelVersion": 1,
    "serverCount": 1,
    "exportedAt": "2026-09-25T14:00:16.959Z"
  },
  "data": [
    {
      "server": {
        "report": "benchmark-report",
        "modelVersion": 5,
        "serverId": "caf4674e-4e82-4ac1-bb8c-634364b02fcb",
        "serverName": "memory",
        "runId": "7c225b09-dd0b-4177-8d05-bbae0aeb84b0",
        "intervalSeconds": 1,
        "startedAt": "2026-09-25T13:56:52.663Z",
        "stoppedAt": "2026-09-25T13:57:10.247Z",
        "exportedAt": "2026-09-25T14:00:16.955Z",
        "instanceCount": 1,
        "queryCount": 16,
        "failedQueryCount": 0,
        "averageUpdateTimeMs": 86.875,
        "peakUpdateTimeMs": 92,
        "totalFootprintBytes": 2121,
        "chart": {
          "horizontalAxis": "observedAt",
          "verticalAxis": "updateTimeMs",
          "unit": "ms"
        },
        "providerComparison": {
          "timeWindows": 24,
          "method": "mean-of-instance-means"
        },
        "averageComparison": {
          "baselineUpdateTimeMs": 86.875,
          "method": "mean-of-successful-queries"
        }
      },
      "instances": [
        {
          "instance": {
            "sourceId": "f85466cd-32b3-482e-96c1-d0ea5ed402fb",
            "name": "Memory100-1000-3",
            "provider": "memory"
          },
          "chart": [
            {
              "observedAt": "2026-09-25T13:56:52.793Z",
              "updateTimeMs": 77,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T13:56:53.883Z",
              "updateTimeMs": 84,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T13:56:54.977Z",
              "updateTimeMs": 88,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T13:56:56.068Z",
              "updateTimeMs": 85,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T13:56:57.165Z",
              "updateTimeMs": 90,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T13:56:58.259Z",
              "updateTimeMs": 89,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T13:56:59.352Z",
              "updateTimeMs": 87,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T13:57:00.450Z",
              "updateTimeMs": 92,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T13:57:01.544Z",
              "updateTimeMs": 88,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T13:57:02.638Z",
              "updateTimeMs": 88,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T13:57:03.733Z",
              "updateTimeMs": 88,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T13:57:04.827Z",
              "updateTimeMs": 88,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T13:57:05.920Z",
              "updateTimeMs": 87,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T13:57:07.012Z",
              "updateTimeMs": 87,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T13:57:08.104Z",
              "updateTimeMs": 87,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T13:57:09.195Z",
              "updateTimeMs": 85,
              "footprintBytes": 2121
            }
          ],
          "failedQueries": [],
          "table": {
            "queries": 16,
            "failedQueries": 0,
            "queryLossPercent": 0,
            "footprintBytes": 2121,
            "averageUpdateTimeMs": 86.875,
            "meanDeviationMs": 2.0625,
            "peakDeviationMs": 9.875
          }
        }
      ]
    }
  ]
};
