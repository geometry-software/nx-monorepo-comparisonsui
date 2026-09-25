export const bump = {
  "meta": {
    "report": "benchmark-group",
    "modelVersion": 1,
    "serverCount": 2,
    "exportedAt": "2026-09-25T14:45:46.099Z"
  },
  "data": [
    {
      "server": {
        "report": "benchmark-report",
        "modelVersion": 5,
        "serverId": "a8b1d295-eea2-4f15-8804-3741ff4e16e2",
        "serverName": "test_four_forty",
        "runId": "55998e55-aa8d-4e9e-bc4c-6b873d8f1fca",
        "intervalSeconds": 1,
        "startedAt": "2026-09-25T14:15:24.007Z",
        "stoppedAt": "2026-09-25T14:20:02.600Z",
        "exportedAt": "2026-09-25T14:45:46.083Z",
        "instanceCount": 4,
        "queryCount": 1015,
        "failedQueryCount": 0,
        "averageUpdateTimeMs": 407.30443349753693,
        "peakUpdateTimeMs": 3085,
        "totalFootprintBytes": 640,
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
          "baselineUpdateTimeMs": 407.30443349753693,
          "method": "mean-of-successful-queries"
        }
      },
      "instances": [
        {
          "instance": {
            "sourceId": "f172702f-1c3f-417d-87d4-2534ddaa1fb3",
            "name": "mongo_source",
            "provider": "mongodb"
          },
          "chart": [
            {
              "observedAt": "2026-09-25T14:15:24.542Z",
              "updateTimeMs": 430,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:25.903Z",
              "updateTimeMs": 351,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:27.190Z",
              "updateTimeMs": 264,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:28.382Z",
              "updateTimeMs": 182,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:29.570Z",
              "updateTimeMs": 171,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:30.775Z",
              "updateTimeMs": 182,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:31.957Z",
              "updateTimeMs": 172,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:33.283Z",
              "updateTimeMs": 316,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:34.507Z",
              "updateTimeMs": 213,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:35.682Z",
              "updateTimeMs": 165,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:36.881Z",
              "updateTimeMs": 190,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:38.116Z",
              "updateTimeMs": 224,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:39.307Z",
              "updateTimeMs": 174,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:40.523Z",
              "updateTimeMs": 189,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:41.728Z",
              "updateTimeMs": 196,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:42.927Z",
              "updateTimeMs": 191,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:44.121Z",
              "updateTimeMs": 181,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:45.313Z",
              "updateTimeMs": 184,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:46.665Z",
              "updateTimeMs": 337,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:47.865Z",
              "updateTimeMs": 178,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:49.096Z",
              "updateTimeMs": 209,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:50.284Z",
              "updateTimeMs": 179,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:51.510Z",
              "updateTimeMs": 185,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:52.741Z",
              "updateTimeMs": 191,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:53.978Z",
              "updateTimeMs": 214,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:55.181Z",
              "updateTimeMs": 166,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:56.356Z",
              "updateTimeMs": 165,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:57.552Z",
              "updateTimeMs": 186,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:58.735Z",
              "updateTimeMs": 173,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:15:59.925Z",
              "updateTimeMs": 179,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:01.151Z",
              "updateTimeMs": 217,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:02.334Z",
              "updateTimeMs": 173,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:03.529Z",
              "updateTimeMs": 185,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:04.748Z",
              "updateTimeMs": 200,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:05.953Z",
              "updateTimeMs": 196,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:07.227Z",
              "updateTimeMs": 263,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:08.542Z",
              "updateTimeMs": 298,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:09.721Z",
              "updateTimeMs": 167,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:10.894Z",
              "updateTimeMs": 160,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:12.104Z",
              "updateTimeMs": 186,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:13.328Z",
              "updateTimeMs": 215,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:14.511Z",
              "updateTimeMs": 164,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:15.686Z",
              "updateTimeMs": 164,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:16.903Z",
              "updateTimeMs": 208,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:18.099Z",
              "updateTimeMs": 164,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:19.289Z",
              "updateTimeMs": 167,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:20.493Z",
              "updateTimeMs": 190,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:21.672Z",
              "updateTimeMs": 167,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:22.845Z",
              "updateTimeMs": 163,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:24.032Z",
              "updateTimeMs": 163,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:25.199Z",
              "updateTimeMs": 156,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:26.366Z",
              "updateTimeMs": 158,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:27.552Z",
              "updateTimeMs": 176,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:28.751Z",
              "updateTimeMs": 167,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:29.932Z",
              "updateTimeMs": 171,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:31.107Z",
              "updateTimeMs": 166,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:32.331Z",
              "updateTimeMs": 170,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:33.517Z",
              "updateTimeMs": 176,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:34.700Z",
              "updateTimeMs": 174,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:35.901Z",
              "updateTimeMs": 175,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:37.074Z",
              "updateTimeMs": 163,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:38.240Z",
              "updateTimeMs": 158,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:39.460Z",
              "updateTimeMs": 201,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:40.666Z",
              "updateTimeMs": 191,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:41.863Z",
              "updateTimeMs": 177,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:43.057Z",
              "updateTimeMs": 176,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:44.256Z",
              "updateTimeMs": 184,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:45.440Z",
              "updateTimeMs": 173,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:46.616Z",
              "updateTimeMs": 160,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:47.795Z",
              "updateTimeMs": 169,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:48.967Z",
              "updateTimeMs": 160,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:50.143Z",
              "updateTimeMs": 159,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:51.336Z",
              "updateTimeMs": 173,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:52.517Z",
              "updateTimeMs": 162,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:53.728Z",
              "updateTimeMs": 183,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:54.919Z",
              "updateTimeMs": 168,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:56.109Z",
              "updateTimeMs": 180,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:57.290Z",
              "updateTimeMs": 172,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:58.477Z",
              "updateTimeMs": 178,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:16:59.673Z",
              "updateTimeMs": 171,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:00.856Z",
              "updateTimeMs": 161,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:02.038Z",
              "updateTimeMs": 173,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:03.223Z",
              "updateTimeMs": 175,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:04.438Z",
              "updateTimeMs": 196,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:05.643Z",
              "updateTimeMs": 195,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:06.860Z",
              "updateTimeMs": 190,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:08.103Z",
              "updateTimeMs": 203,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:09.307Z",
              "updateTimeMs": 171,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:10.507Z",
              "updateTimeMs": 190,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:11.682Z",
              "updateTimeMs": 166,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:12.859Z",
              "updateTimeMs": 167,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:14.096Z",
              "updateTimeMs": 227,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:15.288Z",
              "updateTimeMs": 165,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:16.466Z",
              "updateTimeMs": 169,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:17.670Z",
              "updateTimeMs": 166,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:18.880Z",
              "updateTimeMs": 201,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:20.056Z",
              "updateTimeMs": 164,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:21.266Z",
              "updateTimeMs": 200,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:22.450Z",
              "updateTimeMs": 171,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:23.638Z",
              "updateTimeMs": 178,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:24.861Z",
              "updateTimeMs": 213,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:26.057Z",
              "updateTimeMs": 169,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:27.256Z",
              "updateTimeMs": 170,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:28.430Z",
              "updateTimeMs": 163,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:29.610Z",
              "updateTimeMs": 168,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:30.824Z",
              "updateTimeMs": 166,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:32.013Z",
              "updateTimeMs": 179,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:33.206Z",
              "updateTimeMs": 183,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:34.426Z",
              "updateTimeMs": 168,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:35.618Z",
              "updateTimeMs": 180,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:36.838Z",
              "updateTimeMs": 210,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:38.041Z",
              "updateTimeMs": 181,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:39.285Z",
              "updateTimeMs": 221,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:40.472Z",
              "updateTimeMs": 165,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:41.784Z",
              "updateTimeMs": 230,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:43.005Z",
              "updateTimeMs": 183,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:44.487Z",
              "updateTimeMs": 472,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:45.703Z",
              "updateTimeMs": 207,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:46.932Z",
              "updateTimeMs": 203,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:48.138Z",
              "updateTimeMs": 184,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:49.343Z",
              "updateTimeMs": 195,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:50.527Z",
              "updateTimeMs": 171,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:51.866Z",
              "updateTimeMs": 328,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:53.073Z",
              "updateTimeMs": 197,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:54.266Z",
              "updateTimeMs": 183,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:55.450Z",
              "updateTimeMs": 168,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:56.626Z",
              "updateTimeMs": 164,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:57.810Z",
              "updateTimeMs": 174,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:17:59.006Z",
              "updateTimeMs": 173,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:00.215Z",
              "updateTimeMs": 185,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:01.426Z",
              "updateTimeMs": 167,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:02.643Z",
              "updateTimeMs": 202,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:03.818Z",
              "updateTimeMs": 165,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:05.014Z",
              "updateTimeMs": 169,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:06.224Z",
              "updateTimeMs": 160,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:07.424Z",
              "updateTimeMs": 189,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:08.625Z",
              "updateTimeMs": 190,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:09.819Z",
              "updateTimeMs": 181,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:11.022Z",
              "updateTimeMs": 179,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:12.242Z",
              "updateTimeMs": 211,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:13.524Z",
              "updateTimeMs": 270,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:14.761Z",
              "updateTimeMs": 227,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:15.978Z",
              "updateTimeMs": 173,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:17.335Z",
              "updateTimeMs": 326,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:18.534Z",
              "updateTimeMs": 180,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:19.760Z",
              "updateTimeMs": 199,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:20.956Z",
              "updateTimeMs": 186,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:22.212Z",
              "updateTimeMs": 242,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:23.438Z",
              "updateTimeMs": 178,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:24.630Z",
              "updateTimeMs": 164,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:25.814Z",
              "updateTimeMs": 174,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:26.985Z",
              "updateTimeMs": 161,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:28.153Z",
              "updateTimeMs": 153,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:29.369Z",
              "updateTimeMs": 198,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:30.569Z",
              "updateTimeMs": 184,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:31.756Z",
              "updateTimeMs": 178,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:32.950Z",
              "updateTimeMs": 181,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:34.192Z",
              "updateTimeMs": 219,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:35.367Z",
              "updateTimeMs": 165,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:36.605Z",
              "updateTimeMs": 209,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:37.825Z",
              "updateTimeMs": 205,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:39.084Z",
              "updateTimeMs": 247,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:40.296Z",
              "updateTimeMs": 190,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:41.558Z",
              "updateTimeMs": 219,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:42.805Z",
              "updateTimeMs": 237,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:44.067Z",
              "updateTimeMs": 227,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:45.275Z",
              "updateTimeMs": 192,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:46.555Z",
              "updateTimeMs": 225,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:47.733Z",
              "updateTimeMs": 159,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:48.954Z",
              "updateTimeMs": 210,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:50.134Z",
              "updateTimeMs": 170,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:51.313Z",
              "updateTimeMs": 158,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:52.519Z",
              "updateTimeMs": 190,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:53.714Z",
              "updateTimeMs": 172,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:54.902Z",
              "updateTimeMs": 178,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:56.164Z",
              "updateTimeMs": 250,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:57.428Z",
              "updateTimeMs": 250,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:18:58.918Z",
              "updateTimeMs": 472,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:00.266Z",
              "updateTimeMs": 328,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:01.559Z",
              "updateTimeMs": 269,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:02.837Z",
              "updateTimeMs": 254,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:04.147Z",
              "updateTimeMs": 273,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:05.486Z",
              "updateTimeMs": 328,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:06.731Z",
              "updateTimeMs": 226,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:07.937Z",
              "updateTimeMs": 190,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:09.137Z",
              "updateTimeMs": 191,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:10.331Z",
              "updateTimeMs": 175,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:11.559Z",
              "updateTimeMs": 194,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:12.737Z",
              "updateTimeMs": 164,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:13.931Z",
              "updateTimeMs": 184,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:15.167Z",
              "updateTimeMs": 226,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:16.367Z",
              "updateTimeMs": 187,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:17.560Z",
              "updateTimeMs": 177,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:18.736Z",
              "updateTimeMs": 156,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:19.974Z",
              "updateTimeMs": 225,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:21.228Z",
              "updateTimeMs": 235,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:22.425Z",
              "updateTimeMs": 182,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:23.613Z",
              "updateTimeMs": 178,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:24.818Z",
              "updateTimeMs": 195,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:25.991Z",
              "updateTimeMs": 163,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:27.222Z",
              "updateTimeMs": 221,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:28.431Z",
              "updateTimeMs": 199,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:29.637Z",
              "updateTimeMs": 172,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:30.826Z",
              "updateTimeMs": 171,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:32.034Z",
              "updateTimeMs": 184,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:33.258Z",
              "updateTimeMs": 188,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:34.482Z",
              "updateTimeMs": 214,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:35.672Z",
              "updateTimeMs": 179,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:36.903Z",
              "updateTimeMs": 223,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:38.103Z",
              "updateTimeMs": 175,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:39.302Z",
              "updateTimeMs": 185,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:40.475Z",
              "updateTimeMs": 162,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:41.653Z",
              "updateTimeMs": 157,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:42.853Z",
              "updateTimeMs": 163,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:44.047Z",
              "updateTimeMs": 171,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:45.266Z",
              "updateTimeMs": 194,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:46.462Z",
              "updateTimeMs": 186,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:47.647Z",
              "updateTimeMs": 171,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:48.824Z",
              "updateTimeMs": 167,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:49.834Z",
              "updateTimeMs": 234,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:50.015Z",
              "updateTimeMs": 222,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:50.120Z",
              "updateTimeMs": 278,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:50.238Z",
              "updateTimeMs": 259,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:50.322Z",
              "updateTimeMs": 174,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:50.516Z",
              "updateTimeMs": 184,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:50.692Z",
              "updateTimeMs": 167,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:50.889Z",
              "updateTimeMs": 188,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:51.108Z",
              "updateTimeMs": 210,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:51.286Z",
              "updateTimeMs": 219,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:51.423Z",
              "updateTimeMs": 173,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:51.601Z",
              "updateTimeMs": 165,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:51.743Z",
              "updateTimeMs": 603,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:51.787Z",
              "updateTimeMs": 177,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:51.969Z",
              "updateTimeMs": 173,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:52.162Z",
              "updateTimeMs": 183,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:52.310Z",
              "updateTimeMs": 167,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:52.592Z",
              "updateTimeMs": 255,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:52.926Z",
              "updateTimeMs": 249,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:53.024Z",
              "updateTimeMs": 242,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:53.054Z",
              "updateTimeMs": 210,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:53.200Z",
              "updateTimeMs": 200,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:53.349Z",
              "updateTimeMs": 187,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:53.548Z",
              "updateTimeMs": 181,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:54.198Z",
              "updateTimeMs": 157,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:55.362Z",
              "updateTimeMs": 155,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:56.559Z",
              "updateTimeMs": 212,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:56.599Z",
              "updateTimeMs": 223,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:56.751Z",
              "updateTimeMs": 213,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:57.069Z",
              "updateTimeMs": 374,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:57.280Z",
              "updateTimeMs": 436,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:57.332Z",
              "updateTimeMs": 315,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:57.766Z",
              "updateTimeMs": 158,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:19:58.936Z",
              "updateTimeMs": 159,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:20:00.113Z",
              "updateTimeMs": 167,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:20:01.301Z",
              "updateTimeMs": 174,
              "footprintBytes": 120
            },
            {
              "observedAt": "2026-09-25T14:20:02.528Z",
              "updateTimeMs": 203,
              "footprintBytes": 120
            }
          ],
          "failedQueries": [],
          "table": {
            "queries": 256,
            "failedQueries": 0,
            "queryLossPercent": 0,
            "footprintBytes": 120,
            "averageUpdateTimeMs": 199.3515625,
            "meanDeviationMs": 33.99945068359375,
            "peakDeviationMs": 403.6484375
          }
        },
        {
          "instance": {
            "sourceId": "2b49d085-faf3-442a-bd81-6530827b82b1",
            "name": "firebase_source",
            "provider": "firebase"
          },
          "chart": [
            {
              "observedAt": "2026-09-25T14:15:25.388Z",
              "updateTimeMs": 1266,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:15:27.209Z",
              "updateTimeMs": 811,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:15:29.003Z",
              "updateTimeMs": 785,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:15:30.802Z",
              "updateTimeMs": 788,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:15:32.588Z",
              "updateTimeMs": 777,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:15:34.385Z",
              "updateTimeMs": 781,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:15:36.192Z",
              "updateTimeMs": 797,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:15:37.986Z",
              "updateTimeMs": 778,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:15:39.774Z",
              "updateTimeMs": 777,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:15:41.564Z",
              "updateTimeMs": 780,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:15:43.358Z",
              "updateTimeMs": 771,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:15:45.148Z",
              "updateTimeMs": 779,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:15:47.009Z",
              "updateTimeMs": 849,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:15:48.818Z",
              "updateTimeMs": 796,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:15:50.615Z",
              "updateTimeMs": 762,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:15:52.419Z",
              "updateTimeMs": 778,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:15:54.218Z",
              "updateTimeMs": 788,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:15:56.014Z",
              "updateTimeMs": 786,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:15:57.812Z",
              "updateTimeMs": 788,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:15:59.593Z",
              "updateTimeMs": 772,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:01.387Z",
              "updateTimeMs": 785,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:03.170Z",
              "updateTimeMs": 772,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:05.015Z",
              "updateTimeMs": 835,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:06.818Z",
              "updateTimeMs": 775,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:08.717Z",
              "updateTimeMs": 879,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:10.543Z",
              "updateTimeMs": 808,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:12.344Z",
              "updateTimeMs": 784,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:14.144Z",
              "updateTimeMs": 777,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:15.927Z",
              "updateTimeMs": 773,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:17.731Z",
              "updateTimeMs": 788,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:19.570Z",
              "updateTimeMs": 829,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:21.370Z",
              "updateTimeMs": 779,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:23.166Z",
              "updateTimeMs": 785,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:24.960Z",
              "updateTimeMs": 779,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:26.775Z",
              "updateTimeMs": 797,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:28.573Z",
              "updateTimeMs": 788,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:30.380Z",
              "updateTimeMs": 796,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:32.393Z",
              "updateTimeMs": 1001,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:34.208Z",
              "updateTimeMs": 803,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:36.013Z",
              "updateTimeMs": 789,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:37.817Z",
              "updateTimeMs": 793,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:39.630Z",
              "updateTimeMs": 800,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:41.435Z",
              "updateTimeMs": 790,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:43.239Z",
              "updateTimeMs": 793,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:45.065Z",
              "updateTimeMs": 798,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:46.847Z",
              "updateTimeMs": 770,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:48.642Z",
              "updateTimeMs": 783,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:50.453Z",
              "updateTimeMs": 799,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:52.243Z",
              "updateTimeMs": 777,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:54.035Z",
              "updateTimeMs": 782,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:55.826Z",
              "updateTimeMs": 780,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:57.621Z",
              "updateTimeMs": 779,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:16:59.412Z",
              "updateTimeMs": 779,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:01.195Z",
              "updateTimeMs": 773,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:03.001Z",
              "updateTimeMs": 796,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:04.807Z",
              "updateTimeMs": 782,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:06.789Z",
              "updateTimeMs": 961,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:08.585Z",
              "updateTimeMs": 786,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:10.371Z",
              "updateTimeMs": 778,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:12.143Z",
              "updateTimeMs": 757,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:13.928Z",
              "updateTimeMs": 774,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:15.724Z",
              "updateTimeMs": 785,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:17.546Z",
              "updateTimeMs": 809,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:19.349Z",
              "updateTimeMs": 794,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:21.146Z",
              "updateTimeMs": 787,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:22.942Z",
              "updateTimeMs": 786,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:24.721Z",
              "updateTimeMs": 764,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:26.497Z",
              "updateTimeMs": 764,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:28.310Z",
              "updateTimeMs": 803,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:30.091Z",
              "updateTimeMs": 767,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:31.884Z",
              "updateTimeMs": 783,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:33.757Z",
              "updateTimeMs": 851,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:35.580Z",
              "updateTimeMs": 806,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:37.363Z",
              "updateTimeMs": 763,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:39.163Z",
              "updateTimeMs": 790,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:40.943Z",
              "updateTimeMs": 771,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:42.851Z",
              "updateTimeMs": 899,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:44.710Z",
              "updateTimeMs": 850,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:46.505Z",
              "updateTimeMs": 775,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:48.332Z",
              "updateTimeMs": 783,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:50.143Z",
              "updateTimeMs": 779,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:51.964Z",
              "updateTimeMs": 812,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:53.761Z",
              "updateTimeMs": 783,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:55.551Z",
              "updateTimeMs": 780,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:57.354Z",
              "updateTimeMs": 783,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:17:59.182Z",
              "updateTimeMs": 801,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:00.965Z",
              "updateTimeMs": 769,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:02.858Z",
              "updateTimeMs": 871,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:04.682Z",
              "updateTimeMs": 815,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:06.458Z",
              "updateTimeMs": 765,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:08.281Z",
              "updateTimeMs": 813,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:10.121Z",
              "updateTimeMs": 822,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:11.930Z",
              "updateTimeMs": 795,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:13.764Z",
              "updateTimeMs": 806,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:15.597Z",
              "updateTimeMs": 807,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:17.460Z",
              "updateTimeMs": 840,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:19.272Z",
              "updateTimeMs": 802,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:21.072Z",
              "updateTimeMs": 774,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:22.869Z",
              "updateTimeMs": 772,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:24.669Z",
              "updateTimeMs": 790,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:26.487Z",
              "updateTimeMs": 801,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:28.294Z",
              "updateTimeMs": 788,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:30.101Z",
              "updateTimeMs": 788,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:31.883Z",
              "updateTimeMs": 771,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:33.713Z",
              "updateTimeMs": 803,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:35.697Z",
              "updateTimeMs": 974,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:37.544Z",
              "updateTimeMs": 830,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:39.409Z",
              "updateTimeMs": 844,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:41.243Z",
              "updateTimeMs": 817,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:43.107Z",
              "updateTimeMs": 855,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:44.946Z",
              "updateTimeMs": 792,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:46.803Z",
              "updateTimeMs": 847,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:48.594Z",
              "updateTimeMs": 781,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:50.393Z",
              "updateTimeMs": 788,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:52.187Z",
              "updateTimeMs": 785,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:53.960Z",
              "updateTimeMs": 762,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:55.746Z",
              "updateTimeMs": 772,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:57.650Z",
              "updateTimeMs": 880,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:18:59.565Z",
              "updateTimeMs": 901,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:01.475Z",
              "updateTimeMs": 899,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:03.374Z",
              "updateTimeMs": 862,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:05.261Z",
              "updateTimeMs": 874,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:07.102Z",
              "updateTimeMs": 828,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:08.924Z",
              "updateTimeMs": 810,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:10.759Z",
              "updateTimeMs": 789,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:11.768Z",
              "updateTimeMs": 803,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:12.564Z",
              "updateTimeMs": 1032,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:13.270Z",
              "updateTimeMs": 998,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:13.288Z",
              "updateTimeMs": 1933,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:13.559Z",
              "updateTimeMs": 1781,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:13.579Z",
              "updateTimeMs": 2417,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:14.065Z",
              "updateTimeMs": 2354,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:14.277Z",
              "updateTimeMs": 1140,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:14.797Z",
              "updateTimeMs": 2880,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:15.033Z",
              "updateTimeMs": 1010,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:15.055Z",
              "updateTimeMs": 2978,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:15.520Z",
              "updateTimeMs": 2872,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:15.799Z",
              "updateTimeMs": 2353,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:15.816Z",
              "updateTimeMs": 865,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:16.062Z",
              "updateTimeMs": 1775,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:16.079Z",
              "updateTimeMs": 2463,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:16.812Z",
              "updateTimeMs": 1068,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:16.836Z",
              "updateTimeMs": 1657,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:17.101Z",
              "updateTimeMs": 2532,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:17.586Z",
              "updateTimeMs": 3075,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:17.831Z",
              "updateTimeMs": 3085,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:17.848Z",
              "updateTimeMs": 1003,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:18.366Z",
              "updateTimeMs": 1930,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:18.572Z",
              "updateTimeMs": 2336,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:19.107Z",
              "updateTimeMs": 1980,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:19.127Z",
              "updateTimeMs": 1017,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:19.350Z",
              "updateTimeMs": 1985,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:19.879Z",
              "updateTimeMs": 1085,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:20.621Z",
              "updateTimeMs": 793,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:21.135Z",
              "updateTimeMs": 998,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:22.948Z",
              "updateTimeMs": 800,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:23.806Z",
              "updateTimeMs": 762,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:23.824Z",
              "updateTimeMs": 1330,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:24.581Z",
              "updateTimeMs": 1050,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:24.854Z",
              "updateTimeMs": 887,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:25.609Z",
              "updateTimeMs": 1447,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:25.626Z",
              "updateTimeMs": 930,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:26.385Z",
              "updateTimeMs": 1150,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:27.156Z",
              "updateTimeMs": 1474,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:27.173Z",
              "updateTimeMs": 1048,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:27.907Z",
              "updateTimeMs": 2038,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:27.925Z",
              "updateTimeMs": 845,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:28.645Z",
              "updateTimeMs": 2168,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:28.662Z",
              "updateTimeMs": 1014,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:28.924Z",
              "updateTimeMs": 2080,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:29.400Z",
              "updateTimeMs": 1989,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:29.703Z",
              "updateTimeMs": 1188,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:30.581Z",
              "updateTimeMs": 2411,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:30.616Z",
              "updateTimeMs": 806,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:30.852Z",
              "updateTimeMs": 2008,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:30.875Z",
              "updateTimeMs": 1942,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:30.893Z",
              "updateTimeMs": 2955,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:31.595Z",
              "updateTimeMs": 2331,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:31.613Z",
              "updateTimeMs": 2561,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:31.868Z",
              "updateTimeMs": 1272,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:32.641Z",
              "updateTimeMs": 1197,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:33.106Z",
              "updateTimeMs": 2163,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:33.401Z",
              "updateTimeMs": 1502,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:33.422Z",
              "updateTimeMs": 826,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:34.139Z",
              "updateTimeMs": 1800,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:34.175Z",
              "updateTimeMs": 1181,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:34.433Z",
              "updateTimeMs": 1051,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:35.232Z",
              "updateTimeMs": 789,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:35.707Z",
              "updateTimeMs": 1863,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:35.996Z",
              "updateTimeMs": 1022,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:36.478Z",
              "updateTimeMs": 2027,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:36.757Z",
              "updateTimeMs": 1462,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:36.775Z",
              "updateTimeMs": 812,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:37.521Z",
              "updateTimeMs": 1841,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:37.552Z",
              "updateTimeMs": 1203,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:37.770Z",
              "updateTimeMs": 1060,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:38.563Z",
              "updateTimeMs": 1060,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:39.010Z",
              "updateTimeMs": 1998,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:39.343Z",
              "updateTimeMs": 983,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:39.768Z",
              "updateTimeMs": 2238,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:40.108Z",
              "updateTimeMs": 1001,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:40.603Z",
              "updateTimeMs": 2591,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:40.856Z",
              "updateTimeMs": 2111,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:40.886Z",
              "updateTimeMs": 1430,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:40.906Z",
              "updateTimeMs": 789,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:41.630Z",
              "updateTimeMs": 2057,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:41.892Z",
              "updateTimeMs": 1448,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:42.140Z",
              "updateTimeMs": 1273,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:42.431Z",
              "updateTimeMs": 2653,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:42.662Z",
              "updateTimeMs": 1516,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:43.422Z",
              "updateTimeMs": 781,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:45.215Z",
              "updateTimeMs": 772,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:47.028Z",
              "updateTimeMs": 785,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:48.842Z",
              "updateTimeMs": 802,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:50.643Z",
              "updateTimeMs": 790,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:52.517Z",
              "updateTimeMs": 851,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:54.302Z",
              "updateTimeMs": 775,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:56.119Z",
              "updateTimeMs": 792,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:57.896Z",
              "updateTimeMs": 767,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:19:59.685Z",
              "updateTimeMs": 777,
              "footprintBytes": 193
            },
            {
              "observedAt": "2026-09-25T14:20:01.474Z",
              "updateTimeMs": 776,
              "footprintBytes": 193
            }
          ],
          "failedQueries": [],
          "table": {
            "queries": 221,
            "failedQueries": 0,
            "queryLossPercent": 0,
            "footprintBytes": 193,
            "averageUpdateTimeMs": 1117.6923076923076,
            "meanDeviationMs": 435.2871562826313,
            "peakDeviationMs": 1967.3076923076924
          }
        },
        {
          "instance": {
            "sourceId": "2436941a-63bb-428f-bdf9-7b03218bb27a",
            "name": "test4",
            "provider": "mongodb"
          },
          "chart": [
            {
              "observedAt": "2026-09-25T14:15:24.591Z",
              "updateTimeMs": 460,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:25.779Z",
              "updateTimeMs": 177,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:26.965Z",
              "updateTimeMs": 177,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:28.167Z",
              "updateTimeMs": 193,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:29.381Z",
              "updateTimeMs": 181,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:30.564Z",
              "updateTimeMs": 173,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:31.751Z",
              "updateTimeMs": 178,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:33.098Z",
              "updateTimeMs": 337,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:34.314Z",
              "updateTimeMs": 203,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:35.545Z",
              "updateTimeMs": 182,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:36.723Z",
              "updateTimeMs": 169,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:37.909Z",
              "updateTimeMs": 176,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:39.096Z",
              "updateTimeMs": 171,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:40.296Z",
              "updateTimeMs": 189,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:41.664Z",
              "updateTimeMs": 359,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:42.870Z",
              "updateTimeMs": 196,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:44.066Z",
              "updateTimeMs": 183,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:45.251Z",
              "updateTimeMs": 164,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:46.423Z",
              "updateTimeMs": 163,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:47.597Z",
              "updateTimeMs": 164,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:48.795Z",
              "updateTimeMs": 188,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:50.001Z",
              "updateTimeMs": 163,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:51.279Z",
              "updateTimeMs": 267,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:52.493Z",
              "updateTimeMs": 202,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:53.694Z",
              "updateTimeMs": 186,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:54.915Z",
              "updateTimeMs": 206,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:56.121Z",
              "updateTimeMs": 188,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:57.309Z",
              "updateTimeMs": 177,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:58.483Z",
              "updateTimeMs": 165,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:15:59.688Z",
              "updateTimeMs": 192,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:00.873Z",
              "updateTimeMs": 174,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:02.071Z",
              "updateTimeMs": 189,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:03.419Z",
              "updateTimeMs": 337,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:04.621Z",
              "updateTimeMs": 193,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:05.803Z",
              "updateTimeMs": 170,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:07.023Z",
              "updateTimeMs": 194,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:08.235Z",
              "updateTimeMs": 191,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:09.440Z",
              "updateTimeMs": 196,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:10.649Z",
              "updateTimeMs": 194,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:11.838Z",
              "updateTimeMs": 164,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:13.012Z",
              "updateTimeMs": 163,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:14.186Z",
              "updateTimeMs": 163,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:15.369Z",
              "updateTimeMs": 172,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:16.553Z",
              "updateTimeMs": 173,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:17.750Z",
              "updateTimeMs": 186,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:18.950Z",
              "updateTimeMs": 181,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:20.129Z",
              "updateTimeMs": 168,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:21.312Z",
              "updateTimeMs": 172,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:22.530Z",
              "updateTimeMs": 200,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:23.701Z",
              "updateTimeMs": 158,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:24.890Z",
              "updateTimeMs": 177,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:26.071Z",
              "updateTimeMs": 171,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:27.240Z",
              "updateTimeMs": 159,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:28.454Z",
              "updateTimeMs": 187,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:29.640Z",
              "updateTimeMs": 173,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:30.829Z",
              "updateTimeMs": 178,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:32.076Z",
              "updateTimeMs": 237,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:33.257Z",
              "updateTimeMs": 168,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:34.421Z",
              "updateTimeMs": 154,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:35.603Z",
              "updateTimeMs": 172,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:36.946Z",
              "updateTimeMs": 331,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:38.126Z",
              "updateTimeMs": 171,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:39.325Z",
              "updateTimeMs": 186,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:40.519Z",
              "updateTimeMs": 185,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:41.712Z",
              "updateTimeMs": 183,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:42.898Z",
              "updateTimeMs": 177,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:44.092Z",
              "updateTimeMs": 183,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:45.286Z",
              "updateTimeMs": 181,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:46.476Z",
              "updateTimeMs": 181,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:47.669Z",
              "updateTimeMs": 184,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:48.853Z",
              "updateTimeMs": 172,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:50.046Z",
              "updateTimeMs": 184,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:51.225Z",
              "updateTimeMs": 169,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:52.420Z",
              "updateTimeMs": 166,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:53.604Z",
              "updateTimeMs": 160,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:54.787Z",
              "updateTimeMs": 173,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:55.966Z",
              "updateTimeMs": 163,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:57.147Z",
              "updateTimeMs": 171,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:58.338Z",
              "updateTimeMs": 169,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:16:59.521Z",
              "updateTimeMs": 174,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:00.686Z",
              "updateTimeMs": 152,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:01.885Z",
              "updateTimeMs": 168,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:03.081Z",
              "updateTimeMs": 172,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:04.291Z",
              "updateTimeMs": 190,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:05.466Z",
              "updateTimeMs": 161,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:06.652Z",
              "updateTimeMs": 176,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:07.852Z",
              "updateTimeMs": 190,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:09.033Z",
              "updateTimeMs": 172,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:10.210Z",
              "updateTimeMs": 168,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:11.414Z",
              "updateTimeMs": 195,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:12.590Z",
              "updateTimeMs": 167,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:13.764Z",
              "updateTimeMs": 164,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:14.961Z",
              "updateTimeMs": 184,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:16.131Z",
              "updateTimeMs": 155,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:17.297Z",
              "updateTimeMs": 156,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:18.497Z",
              "updateTimeMs": 190,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:19.725Z",
              "updateTimeMs": 201,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:20.910Z",
              "updateTimeMs": 174,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:22.096Z",
              "updateTimeMs": 173,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:23.313Z",
              "updateTimeMs": 193,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:24.569Z",
              "updateTimeMs": 233,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:25.786Z",
              "updateTimeMs": 186,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:26.967Z",
              "updateTimeMs": 171,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:28.175Z",
              "updateTimeMs": 199,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:29.360Z",
              "updateTimeMs": 174,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:30.557Z",
              "updateTimeMs": 186,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:31.739Z",
              "updateTimeMs": 172,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:32.942Z",
              "updateTimeMs": 194,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:34.172Z",
              "updateTimeMs": 220,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:35.390Z",
              "updateTimeMs": 161,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:36.571Z",
              "updateTimeMs": 171,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:37.880Z",
              "updateTimeMs": 251,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:39.119Z",
              "updateTimeMs": 213,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:40.297Z",
              "updateTimeMs": 168,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:41.595Z",
              "updateTimeMs": 287,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:42.776Z",
              "updateTimeMs": 170,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:43.988Z",
              "updateTimeMs": 189,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:45.216Z",
              "updateTimeMs": 218,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:46.412Z",
              "updateTimeMs": 167,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:47.653Z",
              "updateTimeMs": 229,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:48.866Z",
              "updateTimeMs": 196,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:50.042Z",
              "updateTimeMs": 164,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:51.240Z",
              "updateTimeMs": 170,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:52.433Z",
              "updateTimeMs": 183,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:53.635Z",
              "updateTimeMs": 170,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:54.804Z",
              "updateTimeMs": 158,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:56.002Z",
              "updateTimeMs": 188,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:57.178Z",
              "updateTimeMs": 162,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:58.362Z",
              "updateTimeMs": 164,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:17:59.535Z",
              "updateTimeMs": 162,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:00.708Z",
              "updateTimeMs": 163,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:01.898Z",
              "updateTimeMs": 173,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:03.171Z",
              "updateTimeMs": 256,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:04.353Z",
              "updateTimeMs": 166,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:05.579Z",
              "updateTimeMs": 201,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:06.759Z",
              "updateTimeMs": 168,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:07.968Z",
              "updateTimeMs": 170,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:09.199Z",
              "updateTimeMs": 204,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:10.621Z",
              "updateTimeMs": 410,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:11.863Z",
              "updateTimeMs": 225,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:13.085Z",
              "updateTimeMs": 192,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:14.334Z",
              "updateTimeMs": 235,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:15.553Z",
              "updateTimeMs": 198,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:16.813Z",
              "updateTimeMs": 204,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:18.153Z",
              "updateTimeMs": 286,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:19.551Z",
              "updateTimeMs": 365,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:20.735Z",
              "updateTimeMs": 158,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:22.142Z",
              "updateTimeMs": 352,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:23.381Z",
              "updateTimeMs": 230,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:24.595Z",
              "updateTimeMs": 198,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:25.773Z",
              "updateTimeMs": 168,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:26.945Z",
              "updateTimeMs": 158,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:28.110Z",
              "updateTimeMs": 155,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:29.347Z",
              "updateTimeMs": 224,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:30.542Z",
              "updateTimeMs": 170,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:31.717Z",
              "updateTimeMs": 164,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:32.902Z",
              "updateTimeMs": 174,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:34.143Z",
              "updateTimeMs": 226,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:35.586Z",
              "updateTimeMs": 434,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:36.815Z",
              "updateTimeMs": 201,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:38.106Z",
              "updateTimeMs": 269,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:39.325Z",
              "updateTimeMs": 168,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:40.560Z",
              "updateTimeMs": 175,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:41.773Z",
              "updateTimeMs": 177,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:43.005Z",
              "updateTimeMs": 219,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:44.293Z",
              "updateTimeMs": 270,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:45.522Z",
              "updateTimeMs": 198,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:46.723Z",
              "updateTimeMs": 189,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:47.916Z",
              "updateTimeMs": 166,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:49.088Z",
              "updateTimeMs": 156,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:50.259Z",
              "updateTimeMs": 162,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:51.441Z",
              "updateTimeMs": 168,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:52.630Z",
              "updateTimeMs": 168,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:53.842Z",
              "updateTimeMs": 187,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:55.013Z",
              "updateTimeMs": 155,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:56.278Z",
              "updateTimeMs": 255,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:57.480Z",
              "updateTimeMs": 193,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:58.725Z",
              "updateTimeMs": 233,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:18:59.996Z",
              "updateTimeMs": 247,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:01.260Z",
              "updateTimeMs": 245,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:02.500Z",
              "updateTimeMs": 226,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:03.763Z",
              "updateTimeMs": 247,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:04.997Z",
              "updateTimeMs": 220,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:06.247Z",
              "updateTimeMs": 240,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:07.502Z",
              "updateTimeMs": 245,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:08.692Z",
              "updateTimeMs": 177,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:09.907Z",
              "updateTimeMs": 190,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:11.125Z",
              "updateTimeMs": 173,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:12.309Z",
              "updateTimeMs": 174,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:13.529Z",
              "updateTimeMs": 194,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:14.733Z",
              "updateTimeMs": 195,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:15.951Z",
              "updateTimeMs": 195,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:17.159Z",
              "updateTimeMs": 199,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:18.349Z",
              "updateTimeMs": 177,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:19.521Z",
              "updateTimeMs": 158,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:20.718Z",
              "updateTimeMs": 188,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:21.914Z",
              "updateTimeMs": 182,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:23.097Z",
              "updateTimeMs": 168,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:24.300Z",
              "updateTimeMs": 184,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:25.472Z",
              "updateTimeMs": 162,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:26.640Z",
              "updateTimeMs": 153,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:27.831Z",
              "updateTimeMs": 156,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:29.042Z",
              "updateTimeMs": 188,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:30.234Z",
              "updateTimeMs": 182,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:31.464Z",
              "updateTimeMs": 220,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:32.664Z",
              "updateTimeMs": 182,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:33.994Z",
              "updateTimeMs": 320,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:35.186Z",
              "updateTimeMs": 181,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:36.389Z",
              "updateTimeMs": 173,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:37.580Z",
              "updateTimeMs": 181,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:38.781Z",
              "updateTimeMs": 179,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:39.983Z",
              "updateTimeMs": 175,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:41.167Z",
              "updateTimeMs": 173,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:42.384Z",
              "updateTimeMs": 207,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:43.575Z",
              "updateTimeMs": 178,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:44.403Z",
              "updateTimeMs": 192,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:44.595Z",
              "updateTimeMs": 182,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:44.793Z",
              "updateTimeMs": 173,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:45.311Z",
              "updateTimeMs": 172,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:45.524Z",
              "updateTimeMs": 201,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:45.838Z",
              "updateTimeMs": 342,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:45.982Z",
              "updateTimeMs": 272,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:46.034Z",
              "updateTimeMs": 218,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:46.139Z",
              "updateTimeMs": 243,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:46.298Z",
              "updateTimeMs": 202,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:46.534Z",
              "updateTimeMs": 226,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:46.652Z",
              "updateTimeMs": 169,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:46.921Z",
              "updateTimeMs": 256,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:47.077Z",
              "updateTimeMs": 228,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:47.203Z",
              "updateTimeMs": 157,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:47.308Z",
              "updateTimeMs": 249,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:47.467Z",
              "updateTimeMs": 224,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:47.629Z",
              "updateTimeMs": 219,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:47.772Z",
              "updateTimeMs": 192,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:47.967Z",
              "updateTimeMs": 186,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:48.236Z",
              "updateTimeMs": 306,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:48.416Z",
              "updateTimeMs": 321,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:48.530Z",
              "updateTimeMs": 261,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:48.548Z",
              "updateTimeMs": 214,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:49.783Z",
              "updateTimeMs": 211,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:50.978Z",
              "updateTimeMs": 177,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:52.395Z",
              "updateTimeMs": 402,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:53.606Z",
              "updateTimeMs": 197,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:54.846Z",
              "updateTimeMs": 230,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:56.034Z",
              "updateTimeMs": 176,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:57.222Z",
              "updateTimeMs": 174,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:58.404Z",
              "updateTimeMs": 166,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:19:59.577Z",
              "updateTimeMs": 156,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:20:00.741Z",
              "updateTimeMs": 154,
              "footprintBytes": 167
            },
            {
              "observedAt": "2026-09-25T14:20:01.924Z",
              "updateTimeMs": 173,
              "footprintBytes": 167
            }
          ],
          "failedQueries": [],
          "table": {
            "queries": 250,
            "failedQueries": 0,
            "queryLossPercent": 0,
            "footprintBytes": 167,
            "averageUpdateTimeMs": 197.896,
            "meanDeviationMs": 32.62073600000002,
            "peakDeviationMs": 262.10400000000004
          }
        },
        {
          "instance": {
            "sourceId": "7c61f7ed-1137-4927-8b29-e89a674db240",
            "name": "qwe",
            "provider": "mongodb"
          },
          "chart": [
            {
              "observedAt": "2026-09-25T14:15:24.638Z",
              "updateTimeMs": 498,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:25.828Z",
              "updateTimeMs": 165,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:27.243Z",
              "updateTimeMs": 406,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:28.418Z",
              "updateTimeMs": 166,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:29.605Z",
              "updateTimeMs": 177,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:30.820Z",
              "updateTimeMs": 202,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:31.993Z",
              "updateTimeMs": 164,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:33.185Z",
              "updateTimeMs": 182,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:34.438Z",
              "updateTimeMs": 236,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:35.636Z",
              "updateTimeMs": 179,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:36.836Z",
              "updateTimeMs": 159,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:38.056Z",
              "updateTimeMs": 212,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:39.264Z",
              "updateTimeMs": 198,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:40.460Z",
              "updateTimeMs": 182,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:41.681Z",
              "updateTimeMs": 208,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:42.888Z",
              "updateTimeMs": 192,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:44.103Z",
              "updateTimeMs": 177,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:45.296Z",
              "updateTimeMs": 181,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:46.461Z",
              "updateTimeMs": 157,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:47.633Z",
              "updateTimeMs": 162,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:48.841Z",
              "updateTimeMs": 199,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:50.038Z",
              "updateTimeMs": 174,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:51.314Z",
              "updateTimeMs": 267,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:52.540Z",
              "updateTimeMs": 207,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:53.785Z",
              "updateTimeMs": 230,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:54.997Z",
              "updateTimeMs": 177,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:56.210Z",
              "updateTimeMs": 184,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:57.426Z",
              "updateTimeMs": 206,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:58.590Z",
              "updateTimeMs": 153,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:15:59.785Z",
              "updateTimeMs": 181,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:00.999Z",
              "updateTimeMs": 186,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:02.180Z",
              "updateTimeMs": 157,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:03.555Z",
              "updateTimeMs": 340,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:04.784Z",
              "updateTimeMs": 219,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:06.035Z",
              "updateTimeMs": 222,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:07.256Z",
              "updateTimeMs": 186,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:08.627Z",
              "updateTimeMs": 335,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:09.846Z",
              "updateTimeMs": 188,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:11.049Z",
              "updateTimeMs": 192,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:12.262Z",
              "updateTimeMs": 184,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:13.457Z",
              "updateTimeMs": 155,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:14.644Z",
              "updateTimeMs": 177,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:15.855Z",
              "updateTimeMs": 189,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:17.038Z",
              "updateTimeMs": 173,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:18.230Z",
              "updateTimeMs": 180,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:19.498Z",
              "updateTimeMs": 243,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:20.691Z",
              "updateTimeMs": 172,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:21.879Z",
              "updateTimeMs": 153,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:23.103Z",
              "updateTimeMs": 200,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:24.275Z",
              "updateTimeMs": 163,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:25.454Z",
              "updateTimeMs": 170,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:26.650Z",
              "updateTimeMs": 186,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:27.828Z",
              "updateTimeMs": 169,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:29.229Z",
              "updateTimeMs": 390,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:30.451Z",
              "updateTimeMs": 212,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:31.704Z",
              "updateTimeMs": 241,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:32.917Z",
              "updateTimeMs": 174,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:34.109Z",
              "updateTimeMs": 159,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:35.279Z",
              "updateTimeMs": 161,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:36.448Z",
              "updateTimeMs": 160,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:37.636Z",
              "updateTimeMs": 178,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:38.821Z",
              "updateTimeMs": 174,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:39.993Z",
              "updateTimeMs": 159,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:41.204Z",
              "updateTimeMs": 201,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:42.379Z",
              "updateTimeMs": 164,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:43.555Z",
              "updateTimeMs": 167,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:44.755Z",
              "updateTimeMs": 191,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:45.963Z",
              "updateTimeMs": 194,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:47.142Z",
              "updateTimeMs": 156,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:48.321Z",
              "updateTimeMs": 170,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:49.503Z",
              "updateTimeMs": 165,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:50.713Z",
              "updateTimeMs": 200,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:51.883Z",
              "updateTimeMs": 161,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:53.072Z",
              "updateTimeMs": 157,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:54.264Z",
              "updateTimeMs": 169,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:55.431Z",
              "updateTimeMs": 157,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:56.608Z",
              "updateTimeMs": 162,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:57.785Z",
              "updateTimeMs": 153,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:16:58.963Z",
              "updateTimeMs": 169,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:00.151Z",
              "updateTimeMs": 168,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:01.325Z",
              "updateTimeMs": 158,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:02.533Z",
              "updateTimeMs": 195,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:03.746Z",
              "updateTimeMs": 192,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:04.941Z",
              "updateTimeMs": 185,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:06.149Z",
              "updateTimeMs": 191,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:07.381Z",
              "updateTimeMs": 223,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:08.620Z",
              "updateTimeMs": 225,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:09.839Z",
              "updateTimeMs": 182,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:11.055Z",
              "updateTimeMs": 208,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:12.250Z",
              "updateTimeMs": 185,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:13.464Z",
              "updateTimeMs": 190,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:14.657Z",
              "updateTimeMs": 162,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:15.836Z",
              "updateTimeMs": 171,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:17.028Z",
              "updateTimeMs": 173,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:18.219Z",
              "updateTimeMs": 179,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:19.448Z",
              "updateTimeMs": 209,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:20.648Z",
              "updateTimeMs": 188,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:21.838Z",
              "updateTimeMs": 180,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:23.051Z",
              "updateTimeMs": 203,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:24.242Z",
              "updateTimeMs": 164,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:25.453Z",
              "updateTimeMs": 200,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:26.627Z",
              "updateTimeMs": 164,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:27.812Z",
              "updateTimeMs": 174,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:29.005Z",
              "updateTimeMs": 171,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:30.218Z",
              "updateTimeMs": 202,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:31.420Z",
              "updateTimeMs": 190,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:32.604Z",
              "updateTimeMs": 165,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:33.859Z",
              "updateTimeMs": 245,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:35.057Z",
              "updateTimeMs": 175,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:36.275Z",
              "updateTimeMs": 201,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:37.610Z",
              "updateTimeMs": 324,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:38.829Z",
              "updateTimeMs": 198,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:40.027Z",
              "updateTimeMs": 180,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:41.260Z",
              "updateTimeMs": 223,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:42.480Z",
              "updateTimeMs": 210,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:43.722Z",
              "updateTimeMs": 208,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:44.921Z",
              "updateTimeMs": 181,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:46.107Z",
              "updateTimeMs": 176,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:47.286Z",
              "updateTimeMs": 170,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:48.455Z",
              "updateTimeMs": 157,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:49.635Z",
              "updateTimeMs": 170,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:50.813Z",
              "updateTimeMs": 168,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:52.002Z",
              "updateTimeMs": 178,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:53.184Z",
              "updateTimeMs": 171,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:54.370Z",
              "updateTimeMs": 174,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:55.589Z",
              "updateTimeMs": 198,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:56.772Z",
              "updateTimeMs": 173,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:57.957Z",
              "updateTimeMs": 166,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:17:59.135Z",
              "updateTimeMs": 168,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:00.322Z",
              "updateTimeMs": 176,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:01.537Z",
              "updateTimeMs": 205,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:02.726Z",
              "updateTimeMs": 177,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:04.090Z",
              "updateTimeMs": 353,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:05.294Z",
              "updateTimeMs": 177,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:06.477Z",
              "updateTimeMs": 164,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:07.656Z",
              "updateTimeMs": 170,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:08.858Z",
              "updateTimeMs": 192,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:10.432Z",
              "updateTimeMs": 531,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:11.714Z",
              "updateTimeMs": 266,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:12.932Z",
              "updateTimeMs": 201,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:14.213Z",
              "updateTimeMs": 206,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:15.408Z",
              "updateTimeMs": 171,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:16.657Z",
              "updateTimeMs": 235,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:18.029Z",
              "updateTimeMs": 362,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:19.328Z",
              "updateTimeMs": 284,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:20.550Z",
              "updateTimeMs": 205,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:21.727Z",
              "updateTimeMs": 167,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:22.909Z",
              "updateTimeMs": 167,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:24.143Z",
              "updateTimeMs": 207,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:25.349Z",
              "updateTimeMs": 188,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:26.536Z",
              "updateTimeMs": 177,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:27.726Z",
              "updateTimeMs": 180,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:28.899Z",
              "updateTimeMs": 163,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:30.079Z",
              "updateTimeMs": 172,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:31.260Z",
              "updateTimeMs": 165,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:32.474Z",
              "updateTimeMs": 204,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:33.658Z",
              "updateTimeMs": 174,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:34.875Z",
              "updateTimeMs": 183,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:36.068Z",
              "updateTimeMs": 184,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:37.273Z",
              "updateTimeMs": 195,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:38.482Z",
              "updateTimeMs": 188,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:39.709Z",
              "updateTimeMs": 202,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:40.895Z",
              "updateTimeMs": 176,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:42.100Z",
              "updateTimeMs": 177,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:43.326Z",
              "updateTimeMs": 204,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:44.520Z",
              "updateTimeMs": 171,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:45.736Z",
              "updateTimeMs": 183,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:46.963Z",
              "updateTimeMs": 199,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:48.141Z",
              "updateTimeMs": 168,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:49.351Z",
              "updateTimeMs": 191,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:50.527Z",
              "updateTimeMs": 166,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:51.722Z",
              "updateTimeMs": 186,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:52.921Z",
              "updateTimeMs": 170,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:54.095Z",
              "updateTimeMs": 164,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:55.274Z",
              "updateTimeMs": 169,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:56.509Z",
              "updateTimeMs": 221,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:57.711Z",
              "updateTimeMs": 188,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:58.289Z",
              "updateTimeMs": 292,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:58.481Z",
              "updateTimeMs": 302,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:58.969Z",
              "updateTimeMs": 571,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:59.179Z",
              "updateTimeMs": 445,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:59.198Z",
              "updateTimeMs": 620,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:59.282Z",
              "updateTimeMs": 336,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:59.411Z",
              "updateTimeMs": 650,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:59.468Z",
              "updateTimeMs": 338,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:59.645Z",
              "updateTimeMs": 332,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:59.695Z",
              "updateTimeMs": 205,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:18:59.908Z",
              "updateTimeMs": 236,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:00.058Z",
              "updateTimeMs": 197,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:00.283Z",
              "updateTimeMs": 275,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:00.489Z",
              "updateTimeMs": 309,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:00.595Z",
              "updateTimeMs": 388,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:00.786Z",
              "updateTimeMs": 451,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:00.826Z",
              "updateTimeMs": 308,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:01.047Z",
              "updateTimeMs": 198,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:01.066Z",
              "updateTimeMs": 405,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:01.309Z",
              "updateTimeMs": 314,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:01.646Z",
              "updateTimeMs": 468,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:01.824Z",
              "updateTimeMs": 485,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:01.873Z",
              "updateTimeMs": 367,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:02.044Z",
              "updateTimeMs": 415,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:02.061Z",
              "updateTimeMs": 224,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:02.136Z",
              "updateTimeMs": 462,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:02.340Z",
              "updateTimeMs": 314,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:02.459Z",
              "updateTimeMs": 262,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:02.636Z",
              "updateTimeMs": 218,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:02.891Z",
              "updateTimeMs": 329,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:03.070Z",
              "updateTimeMs": 295,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:03.260Z",
              "updateTimeMs": 314,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:03.278Z",
              "updateTimeMs": 226,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:03.542Z",
              "updateTimeMs": 412,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:03.560Z",
              "updateTimeMs": 224,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:03.780Z",
              "updateTimeMs": 283,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:03.973Z",
              "updateTimeMs": 289,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:04.233Z",
              "updateTimeMs": 383,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:04.289Z",
              "updateTimeMs": 258,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:04.505Z",
              "updateTimeMs": 308,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:04.570Z",
              "updateTimeMs": 267,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:04.620Z",
              "updateTimeMs": 243,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:04.855Z",
              "updateTimeMs": 303,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:05.100Z",
              "updateTimeMs": 372,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:05.144Z",
              "updateTimeMs": 266,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:05.420Z",
              "updateTimeMs": 375,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:05.602Z",
              "updateTimeMs": 377,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:05.637Z",
              "updateTimeMs": 236,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:05.851Z",
              "updateTimeMs": 298,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:06.082Z",
              "updateTimeMs": 503,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:06.113Z",
              "updateTimeMs": 227,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:06.172Z",
              "updateTimeMs": 461,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:06.354Z",
              "updateTimeMs": 310,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:06.428Z",
              "updateTimeMs": 220,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:06.852Z",
              "updateTimeMs": 485,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:07.279Z",
              "updateTimeMs": 764,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:07.314Z",
              "updateTimeMs": 652,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:07.523Z",
              "updateTimeMs": 412,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:08.740Z",
              "updateTimeMs": 196,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:09.953Z",
              "updateTimeMs": 204,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:11.334Z",
              "updateTimeMs": 350,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:12.514Z",
              "updateTimeMs": 165,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:13.873Z",
              "updateTimeMs": 334,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:15.109Z",
              "updateTimeMs": 227,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:16.323Z",
              "updateTimeMs": 195,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:17.510Z",
              "updateTimeMs": 177,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:18.692Z",
              "updateTimeMs": 172,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:19.908Z",
              "updateTimeMs": 205,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:21.152Z",
              "updateTimeMs": 231,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:22.327Z",
              "updateTimeMs": 162,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:23.522Z",
              "updateTimeMs": 166,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:24.737Z",
              "updateTimeMs": 180,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:25.951Z",
              "updateTimeMs": 205,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:27.135Z",
              "updateTimeMs": 173,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:28.336Z",
              "updateTimeMs": 175,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:29.527Z",
              "updateTimeMs": 180,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:30.735Z",
              "updateTimeMs": 198,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:31.916Z",
              "updateTimeMs": 172,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:33.175Z",
              "updateTimeMs": 248,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:34.369Z",
              "updateTimeMs": 184,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:35.541Z",
              "updateTimeMs": 162,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:36.735Z",
              "updateTimeMs": 184,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:37.964Z",
              "updateTimeMs": 216,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:39.165Z",
              "updateTimeMs": 177,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:40.354Z",
              "updateTimeMs": 170,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:41.555Z",
              "updateTimeMs": 163,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:42.743Z",
              "updateTimeMs": 177,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:43.941Z",
              "updateTimeMs": 183,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:45.158Z",
              "updateTimeMs": 206,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:46.367Z",
              "updateTimeMs": 197,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:47.598Z",
              "updateTimeMs": 174,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:48.779Z",
              "updateTimeMs": 160,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:50.034Z",
              "updateTimeMs": 231,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:51.228Z",
              "updateTimeMs": 182,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:52.548Z",
              "updateTimeMs": 295,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:53.735Z",
              "updateTimeMs": 176,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:54.559Z",
              "updateTimeMs": 195,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:54.762Z",
              "updateTimeMs": 235,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:54.961Z",
              "updateTimeMs": 264,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:55.032Z",
              "updateTimeMs": 260,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:55.107Z",
              "updateTimeMs": 234,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:55.229Z",
              "updateTimeMs": 188,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:55.388Z",
              "updateTimeMs": 196,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:55.698Z",
              "updateTimeMs": 355,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:55.785Z",
              "updateTimeMs": 292,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:56.240Z",
              "updateTimeMs": 193,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:57.477Z",
              "updateTimeMs": 187,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:58.652Z",
              "updateTimeMs": 166,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:19:59.824Z",
              "updateTimeMs": 162,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:20:01.004Z",
              "updateTimeMs": 170,
              "footprintBytes": 160
            },
            {
              "observedAt": "2026-09-25T14:20:02.186Z",
              "updateTimeMs": 169,
              "footprintBytes": 160
            }
          ],
          "failedQueries": [],
          "table": {
            "queries": 288,
            "failedQueries": 0,
            "queryLossPercent": 0,
            "footprintBytes": 160,
            "averageUpdateTimeMs": 228.80555555555554,
            "meanDeviationMs": 66.52334104938272,
            "peakDeviationMs": 535.1944444444445
          }
        }
      ]
    },
    {
      "server": {
        "report": "benchmark-report",
        "modelVersion": 5,
        "serverId": "e13e1f44-556d-4ab3-bcbc-cbd11ffed5da",
        "serverName": "test_four_hundred",
        "runId": "429f7cbf-c4b3-45c3-b8ab-e940f0e266a3",
        "intervalSeconds": 1,
        "startedAt": "2026-09-25T14:15:24.013Z",
        "stoppedAt": "2026-09-25T14:20:02.613Z",
        "exportedAt": "2026-09-25T14:45:46.084Z",
        "instanceCount": 4,
        "queryCount": 1096,
        "failedQueryCount": 0,
        "averageUpdateTimeMs": 781.0948905109489,
        "peakUpdateTimeMs": 6421,
        "totalFootprintBytes": 6228,
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
          "baselineUpdateTimeMs": 781.0948905109489,
          "method": "mean-of-successful-queries"
        }
      },
      "instances": [
        {
          "instance": {
            "sourceId": "52a5bca5-586e-4509-8f32-459d9c98f3f9",
            "name": "Memory100-1000-3",
            "provider": "memory"
          },
          "chart": [
            {
              "observedAt": "2026-09-25T14:15:24.620Z",
              "updateTimeMs": 471,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:25.880Z",
              "updateTimeMs": 251,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:26.985Z",
              "updateTimeMs": 87,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:28.133Z",
              "updateTimeMs": 111,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:29.223Z",
              "updateTimeMs": 81,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:30.311Z",
              "updateTimeMs": 78,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:31.436Z",
              "updateTimeMs": 114,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:32.545Z",
              "updateTimeMs": 100,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:33.630Z",
              "updateTimeMs": 74,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:34.716Z",
              "updateTimeMs": 76,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:35.808Z",
              "updateTimeMs": 72,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:36.954Z",
              "updateTimeMs": 136,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:38.135Z",
              "updateTimeMs": 172,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:39.220Z",
              "updateTimeMs": 75,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:40.324Z",
              "updateTimeMs": 94,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:41.409Z",
              "updateTimeMs": 77,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:42.499Z",
              "updateTimeMs": 80,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:43.612Z",
              "updateTimeMs": 103,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:44.714Z",
              "updateTimeMs": 76,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:45.847Z",
              "updateTimeMs": 124,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:46.959Z",
              "updateTimeMs": 101,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:48.049Z",
              "updateTimeMs": 76,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:49.160Z",
              "updateTimeMs": 86,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:50.266Z",
              "updateTimeMs": 98,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:51.424Z",
              "updateTimeMs": 133,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:52.580Z",
              "updateTimeMs": 109,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:53.722Z",
              "updateTimeMs": 132,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:54.859Z",
              "updateTimeMs": 100,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:55.988Z",
              "updateTimeMs": 103,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:57.087Z",
              "updateTimeMs": 90,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:58.174Z",
              "updateTimeMs": 76,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:15:59.269Z",
              "updateTimeMs": 77,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:00.377Z",
              "updateTimeMs": 98,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:01.471Z",
              "updateTimeMs": 75,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:02.554Z",
              "updateTimeMs": 73,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:03.668Z",
              "updateTimeMs": 103,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:04.859Z",
              "updateTimeMs": 164,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:05.989Z",
              "updateTimeMs": 121,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:07.207Z",
              "updateTimeMs": 174,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:08.330Z",
              "updateTimeMs": 113,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:09.462Z",
              "updateTimeMs": 88,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:10.605Z",
              "updateTimeMs": 133,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:11.703Z",
              "updateTimeMs": 88,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:12.792Z",
              "updateTimeMs": 79,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:13.892Z",
              "updateTimeMs": 91,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:14.986Z",
              "updateTimeMs": 84,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:16.073Z",
              "updateTimeMs": 77,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:17.175Z",
              "updateTimeMs": 82,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:18.305Z",
              "updateTimeMs": 120,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:19.463Z",
              "updateTimeMs": 147,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:20.582Z",
              "updateTimeMs": 109,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:21.709Z",
              "updateTimeMs": 93,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:22.803Z",
              "updateTimeMs": 84,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:23.887Z",
              "updateTimeMs": 75,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:24.988Z",
              "updateTimeMs": 88,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:26.097Z",
              "updateTimeMs": 86,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:27.198Z",
              "updateTimeMs": 90,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:28.307Z",
              "updateTimeMs": 92,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:29.389Z",
              "updateTimeMs": 72,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:30.538Z",
              "updateTimeMs": 128,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:31.683Z",
              "updateTimeMs": 110,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:32.811Z",
              "updateTimeMs": 111,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:33.923Z",
              "updateTimeMs": 102,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:35.025Z",
              "updateTimeMs": 78,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:36.121Z",
              "updateTimeMs": 80,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:37.205Z",
              "updateTimeMs": 74,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:38.307Z",
              "updateTimeMs": 93,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:39.432Z",
              "updateTimeMs": 98,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:40.557Z",
              "updateTimeMs": 97,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:41.660Z",
              "updateTimeMs": 92,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:42.742Z",
              "updateTimeMs": 73,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:43.852Z",
              "updateTimeMs": 100,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:45.133Z",
              "updateTimeMs": 248,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:46.235Z",
              "updateTimeMs": 92,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:47.321Z",
              "updateTimeMs": 75,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:48.427Z",
              "updateTimeMs": 80,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:49.540Z",
              "updateTimeMs": 99,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:50.652Z",
              "updateTimeMs": 103,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:51.748Z",
              "updateTimeMs": 87,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:52.841Z",
              "updateTimeMs": 84,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:53.930Z",
              "updateTimeMs": 76,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:55.021Z",
              "updateTimeMs": 74,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:56.146Z",
              "updateTimeMs": 90,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:57.247Z",
              "updateTimeMs": 78,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:58.377Z",
              "updateTimeMs": 95,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:16:59.476Z",
              "updateTimeMs": 89,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:00.567Z",
              "updateTimeMs": 82,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:01.661Z",
              "updateTimeMs": 84,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:01.699Z",
              "updateTimeMs": 104,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:01.903Z",
              "updateTimeMs": 82,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:02.140Z",
              "updateTimeMs": 74,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:02.364Z",
              "updateTimeMs": 80,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:02.561Z",
              "updateTimeMs": 99,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:02.779Z",
              "updateTimeMs": 117,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:02.814Z",
              "updateTimeMs": 141,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:02.929Z",
              "updateTimeMs": 84,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:03.160Z",
              "updateTimeMs": 99,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:03.334Z",
              "updateTimeMs": 85,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:03.526Z",
              "updateTimeMs": 76,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:03.729Z",
              "updateTimeMs": 118,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:03.899Z",
              "updateTimeMs": 82,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:03.937Z",
              "updateTimeMs": 104,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:04.090Z",
              "updateTimeMs": 76,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:04.314Z",
              "updateTimeMs": 118,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:04.467Z",
              "updateTimeMs": 83,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:04.650Z",
              "updateTimeMs": 72,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:04.898Z",
              "updateTimeMs": 132,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:05.061Z",
              "updateTimeMs": 109,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:05.098Z",
              "updateTimeMs": 128,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:05.235Z",
              "updateTimeMs": 73,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:05.419Z",
              "updateTimeMs": 74,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:05.625Z",
              "updateTimeMs": 92,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:05.801Z",
              "updateTimeMs": 71,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:05.986Z",
              "updateTimeMs": 75,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:06.192Z",
              "updateTimeMs": 115,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:06.212Z",
              "updateTimeMs": 108,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:06.387Z",
              "updateTimeMs": 106,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:06.547Z",
              "updateTimeMs": 82,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:06.743Z",
              "updateTimeMs": 82,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:06.918Z",
              "updateTimeMs": 94,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:07.053Z",
              "updateTimeMs": 75,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:07.235Z",
              "updateTimeMs": 89,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:07.365Z",
              "updateTimeMs": 148,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:07.455Z",
              "updateTimeMs": 123,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:07.557Z",
              "updateTimeMs": 84,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:07.718Z",
              "updateTimeMs": 81,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:07.890Z",
              "updateTimeMs": 111,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:08.067Z",
              "updateTimeMs": 116,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:08.204Z",
              "updateTimeMs": 93,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:08.376Z",
              "updateTimeMs": 113,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:08.493Z",
              "updateTimeMs": 108,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:08.539Z",
              "updateTimeMs": 118,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:08.730Z",
              "updateTimeMs": 137,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:08.792Z",
              "updateTimeMs": 80,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:08.945Z",
              "updateTimeMs": 73,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:09.115Z",
              "updateTimeMs": 73,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:09.260Z",
              "updateTimeMs": 81,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:09.427Z",
              "updateTimeMs": 74,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:09.611Z",
              "updateTimeMs": 104,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:09.629Z",
              "updateTimeMs": 101,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:09.777Z",
              "updateTimeMs": 92,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:09.942Z",
              "updateTimeMs": 77,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:10.109Z",
              "updateTimeMs": 81,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:10.265Z",
              "updateTimeMs": 87,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:10.489Z",
              "updateTimeMs": 109,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:10.607Z",
              "updateTimeMs": 79,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:10.706Z",
              "updateTimeMs": 79,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:10.879Z",
              "updateTimeMs": 83,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:11.813Z",
              "updateTimeMs": 96,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:12.914Z",
              "updateTimeMs": 91,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:14.073Z",
              "updateTimeMs": 132,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:15.178Z",
              "updateTimeMs": 86,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:16.260Z",
              "updateTimeMs": 73,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:17.354Z",
              "updateTimeMs": 84,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:18.455Z",
              "updateTimeMs": 88,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:19.596Z",
              "updateTimeMs": 118,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:20.726Z",
              "updateTimeMs": 115,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:21.857Z",
              "updateTimeMs": 111,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:22.980Z",
              "updateTimeMs": 113,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:24.068Z",
              "updateTimeMs": 77,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:25.154Z",
              "updateTimeMs": 77,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:26.250Z",
              "updateTimeMs": 86,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:27.351Z",
              "updateTimeMs": 85,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:28.457Z",
              "updateTimeMs": 83,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:29.561Z",
              "updateTimeMs": 96,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:30.681Z",
              "updateTimeMs": 98,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:31.796Z",
              "updateTimeMs": 94,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:32.925Z",
              "updateTimeMs": 104,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:34.042Z",
              "updateTimeMs": 102,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:35.164Z",
              "updateTimeMs": 86,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:36.296Z",
              "updateTimeMs": 108,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:37.581Z",
              "updateTimeMs": 274,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:38.688Z",
              "updateTimeMs": 85,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:39.789Z",
              "updateTimeMs": 90,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:40.902Z",
              "updateTimeMs": 97,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:42.008Z",
              "updateTimeMs": 84,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:43.114Z",
              "updateTimeMs": 81,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:44.468Z",
              "updateTimeMs": 344,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:45.599Z",
              "updateTimeMs": 120,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:46.684Z",
              "updateTimeMs": 73,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:47.785Z",
              "updateTimeMs": 78,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:48.893Z",
              "updateTimeMs": 84,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:50.000Z",
              "updateTimeMs": 79,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:51.095Z",
              "updateTimeMs": 85,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:52.190Z",
              "updateTimeMs": 84,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:53.286Z",
              "updateTimeMs": 74,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:54.398Z",
              "updateTimeMs": 84,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:55.525Z",
              "updateTimeMs": 119,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:56.645Z",
              "updateTimeMs": 106,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:57.764Z",
              "updateTimeMs": 110,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:58.861Z",
              "updateTimeMs": 87,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:17:59.969Z",
              "updateTimeMs": 98,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:01.115Z",
              "updateTimeMs": 108,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:02.205Z",
              "updateTimeMs": 75,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:03.301Z",
              "updateTimeMs": 86,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:04.428Z",
              "updateTimeMs": 117,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:05.560Z",
              "updateTimeMs": 114,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:06.676Z",
              "updateTimeMs": 104,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:07.838Z",
              "updateTimeMs": 151,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:08.943Z",
              "updateTimeMs": 75,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:10.489Z",
              "updateTimeMs": 529,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:11.627Z",
              "updateTimeMs": 128,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:12.713Z",
              "updateTimeMs": 75,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:13.996Z",
              "updateTimeMs": 273,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:15.088Z",
              "updateTimeMs": 81,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:16.203Z",
              "updateTimeMs": 104,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:17.518Z",
              "updateTimeMs": 302,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:18.683Z",
              "updateTimeMs": 129,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:19.952Z",
              "updateTimeMs": 247,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:21.045Z",
              "updateTimeMs": 77,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:22.235Z",
              "updateTimeMs": 148,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:23.345Z",
              "updateTimeMs": 72,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:24.455Z",
              "updateTimeMs": 100,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:25.551Z",
              "updateTimeMs": 82,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:26.647Z",
              "updateTimeMs": 75,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:27.755Z",
              "updateTimeMs": 84,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:28.849Z",
              "updateTimeMs": 78,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:29.933Z",
              "updateTimeMs": 75,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:31.026Z",
              "updateTimeMs": 79,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:32.132Z",
              "updateTimeMs": 96,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:33.229Z",
              "updateTimeMs": 86,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:34.334Z",
              "updateTimeMs": 84,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:35.528Z",
              "updateTimeMs": 179,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:36.706Z",
              "updateTimeMs": 151,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:37.860Z",
              "updateTimeMs": 143,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:38.989Z",
              "updateTimeMs": 105,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:40.130Z",
              "updateTimeMs": 118,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:41.282Z",
              "updateTimeMs": 139,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:42.392Z",
              "updateTimeMs": 94,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:43.574Z",
              "updateTimeMs": 156,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:44.697Z",
              "updateTimeMs": 109,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:45.829Z",
              "updateTimeMs": 111,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:46.946Z",
              "updateTimeMs": 107,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:48.030Z",
              "updateTimeMs": 74,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:49.146Z",
              "updateTimeMs": 91,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:50.241Z",
              "updateTimeMs": 77,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:51.352Z",
              "updateTimeMs": 93,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:52.480Z",
              "updateTimeMs": 110,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:53.571Z",
              "updateTimeMs": 78,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:54.663Z",
              "updateTimeMs": 82,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:55.783Z",
              "updateTimeMs": 103,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:56.913Z",
              "updateTimeMs": 105,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:58.259Z",
              "updateTimeMs": 322,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:18:59.450Z",
              "updateTimeMs": 146,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:00.634Z",
              "updateTimeMs": 167,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:01.779Z",
              "updateTimeMs": 123,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:02.937Z",
              "updateTimeMs": 143,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:04.112Z",
              "updateTimeMs": 159,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:05.304Z",
              "updateTimeMs": 177,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:06.458Z",
              "updateTimeMs": 144,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:07.591Z",
              "updateTimeMs": 124,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:08.721Z",
              "updateTimeMs": 104,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:09.851Z",
              "updateTimeMs": 120,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:11.010Z",
              "updateTimeMs": 127,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:12.104Z",
              "updateTimeMs": 85,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:13.201Z",
              "updateTimeMs": 74,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:14.304Z",
              "updateTimeMs": 95,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:15.411Z",
              "updateTimeMs": 79,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:16.550Z",
              "updateTimeMs": 101,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:17.693Z",
              "updateTimeMs": 124,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:18.828Z",
              "updateTimeMs": 110,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:19.997Z",
              "updateTimeMs": 158,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:21.171Z",
              "updateTimeMs": 124,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:22.284Z",
              "updateTimeMs": 84,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:23.401Z",
              "updateTimeMs": 97,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:24.493Z",
              "updateTimeMs": 74,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:25.590Z",
              "updateTimeMs": 87,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:26.700Z",
              "updateTimeMs": 87,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:27.786Z",
              "updateTimeMs": 72,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:28.880Z",
              "updateTimeMs": 85,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:29.998Z",
              "updateTimeMs": 96,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:31.088Z",
              "updateTimeMs": 78,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:32.181Z",
              "updateTimeMs": 82,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:33.332Z",
              "updateTimeMs": 110,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:34.499Z",
              "updateTimeMs": 147,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:35.626Z",
              "updateTimeMs": 118,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:36.814Z",
              "updateTimeMs": 164,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:37.918Z",
              "updateTimeMs": 94,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:39.029Z",
              "updateTimeMs": 101,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:40.136Z",
              "updateTimeMs": 98,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:41.251Z",
              "updateTimeMs": 76,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:42.367Z",
              "updateTimeMs": 108,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:43.477Z",
              "updateTimeMs": 98,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:44.573Z",
              "updateTimeMs": 77,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:45.658Z",
              "updateTimeMs": 76,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:46.791Z",
              "updateTimeMs": 116,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:47.889Z",
              "updateTimeMs": 78,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:48.984Z",
              "updateTimeMs": 84,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:50.139Z",
              "updateTimeMs": 142,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:51.268Z",
              "updateTimeMs": 119,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:52.462Z",
              "updateTimeMs": 184,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:53.576Z",
              "updateTimeMs": 99,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:54.741Z",
              "updateTimeMs": 152,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:55.876Z",
              "updateTimeMs": 125,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:57.007Z",
              "updateTimeMs": 96,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:58.107Z",
              "updateTimeMs": 80,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:19:59.197Z",
              "updateTimeMs": 76,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:20:00.288Z",
              "updateTimeMs": 80,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:20:01.425Z",
              "updateTimeMs": 109,
              "footprintBytes": 2121
            },
            {
              "observedAt": "2026-09-25T14:20:02.546Z",
              "updateTimeMs": 110,
              "footprintBytes": 2121
            }
          ],
          "failedQueries": [],
          "table": {
            "queries": 300,
            "failedQueries": 0,
            "queryLossPercent": 0,
            "footprintBytes": 2121,
            "averageUpdateTimeMs": 106.57,
            "meanDeviationMs": 27.653333333333332,
            "peakDeviationMs": 422.43
          }
        },
        {
          "instance": {
            "sourceId": "de4103bf-6062-4a2f-9328-833a8edecc87",
            "name": "Firebase100-1000-3",
            "provider": "firebase"
          },
          "chart": [
            {
              "observedAt": "2026-09-25T14:15:25.199Z",
              "updateTimeMs": 1040,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:15:27.003Z",
              "updateTimeMs": 792,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:15:28.856Z",
              "updateTimeMs": 800,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:15:30.636Z",
              "updateTimeMs": 768,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:15:32.469Z",
              "updateTimeMs": 816,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:15:34.279Z",
              "updateTimeMs": 800,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:15:36.078Z",
              "updateTimeMs": 784,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:15:37.863Z",
              "updateTimeMs": 775,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:15:39.650Z",
              "updateTimeMs": 776,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:15:41.490Z",
              "updateTimeMs": 831,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:15:43.288Z",
              "updateTimeMs": 771,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:15:45.075Z",
              "updateTimeMs": 777,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:15:46.886Z",
              "updateTimeMs": 800,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:15:48.667Z",
              "updateTimeMs": 765,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:15:50.470Z",
              "updateTimeMs": 793,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:15:52.252Z",
              "updateTimeMs": 773,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:15:54.088Z",
              "updateTimeMs": 824,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:15:55.872Z",
              "updateTimeMs": 775,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:15:57.676Z",
              "updateTimeMs": 791,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:15:59.455Z",
              "updateTimeMs": 770,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:01.254Z",
              "updateTimeMs": 788,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:03.073Z",
              "updateTimeMs": 794,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:04.896Z",
              "updateTimeMs": 811,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:06.689Z",
              "updateTimeMs": 773,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:08.566Z",
              "updateTimeMs": 865,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:10.387Z",
              "updateTimeMs": 804,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:12.192Z",
              "updateTimeMs": 794,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:13.981Z",
              "updateTimeMs": 779,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:15.792Z",
              "updateTimeMs": 788,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:17.592Z",
              "updateTimeMs": 792,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:19.422Z",
              "updateTimeMs": 816,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:21.222Z",
              "updateTimeMs": 780,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:23.032Z",
              "updateTimeMs": 797,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:24.834Z",
              "updateTimeMs": 782,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:26.612Z",
              "updateTimeMs": 768,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:28.436Z",
              "updateTimeMs": 797,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:30.228Z",
              "updateTimeMs": 781,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:32.104Z",
              "updateTimeMs": 865,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:33.905Z",
              "updateTimeMs": 790,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:35.716Z",
              "updateTimeMs": 801,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:37.504Z",
              "updateTimeMs": 778,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:39.296Z",
              "updateTimeMs": 782,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:41.101Z",
              "updateTimeMs": 795,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:42.918Z",
              "updateTimeMs": 806,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:44.699Z",
              "updateTimeMs": 772,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:46.502Z",
              "updateTimeMs": 793,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:48.303Z",
              "updateTimeMs": 786,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:50.108Z",
              "updateTimeMs": 782,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:51.909Z",
              "updateTimeMs": 781,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:53.711Z",
              "updateTimeMs": 786,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:55.524Z",
              "updateTimeMs": 783,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:57.329Z",
              "updateTimeMs": 775,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:16:59.121Z",
              "updateTimeMs": 773,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:00.913Z",
              "updateTimeMs": 780,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:02.700Z",
              "updateTimeMs": 770,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:04.503Z",
              "updateTimeMs": 794,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:06.328Z",
              "updateTimeMs": 814,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:08.146Z",
              "updateTimeMs": 801,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:09.977Z",
              "updateTimeMs": 816,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:11.751Z",
              "updateTimeMs": 763,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:13.585Z",
              "updateTimeMs": 818,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:15.378Z",
              "updateTimeMs": 761,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:17.179Z",
              "updateTimeMs": 771,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:18.841Z",
              "updateTimeMs": 763,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:19.763Z",
              "updateTimeMs": 1574,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:19.780Z",
              "updateTimeMs": 890,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:20.015Z",
              "updateTimeMs": 1550,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:20.808Z",
              "updateTimeMs": 1073,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:21.237Z",
              "updateTimeMs": 1910,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:21.563Z",
              "updateTimeMs": 942,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:22.038Z",
              "updateTimeMs": 1902,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:22.304Z",
              "updateTimeMs": 792,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:22.323Z",
              "updateTimeMs": 1542,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:23.071Z",
              "updateTimeMs": 2035,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:23.089Z",
              "updateTimeMs": 1158,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:23.837Z",
              "updateTimeMs": 1025,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:23.857Z",
              "updateTimeMs": 1496,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:24.620Z",
              "updateTimeMs": 951,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:24.880Z",
              "updateTimeMs": 1695,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:25.640Z",
              "updateTimeMs": 2299,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:25.659Z",
              "updateTimeMs": 1147,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:25.876Z",
              "updateTimeMs": 1789,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:27.059Z",
              "updateTimeMs": 1896,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:27.077Z",
              "updateTimeMs": 799,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:28.053Z",
              "updateTimeMs": 760,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:28.073Z",
              "updateTimeMs": 1417,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:28.823Z",
              "updateTimeMs": 1074,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:29.081Z",
              "updateTimeMs": 951,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:29.837Z",
              "updateTimeMs": 1326,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:29.855Z",
              "updateTimeMs": 940,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:30.604Z",
              "updateTimeMs": 1512,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:30.891Z",
              "updateTimeMs": 1162,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:31.135Z",
              "updateTimeMs": 1821,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:31.400Z",
              "updateTimeMs": 1201,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:32.177Z",
              "updateTimeMs": 1149,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:32.972Z",
              "updateTimeMs": 1050,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:33.437Z",
              "updateTimeMs": 1989,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:33.719Z",
              "updateTimeMs": 2092,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:33.739Z",
              "updateTimeMs": 1053,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:34.456Z",
              "updateTimeMs": 2176,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:34.475Z",
              "updateTimeMs": 991,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:34.733Z",
              "updateTimeMs": 1638,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:35.456Z",
              "updateTimeMs": 1492,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:35.724Z",
              "updateTimeMs": 1396,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:35.749Z",
              "updateTimeMs": 1966,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:36.481Z",
              "updateTimeMs": 1220,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:36.772Z",
              "updateTimeMs": 2063,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:36.791Z",
              "updateTimeMs": 2646,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:37.000Z",
              "updateTimeMs": 2480,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:37.508Z",
              "updateTimeMs": 2646,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:37.777Z",
              "updateTimeMs": 1521,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:38.251Z",
              "updateTimeMs": 2189,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:38.272Z",
              "updateTimeMs": 3528,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:38.510Z",
              "updateTimeMs": 3046,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:38.538Z",
              "updateTimeMs": 1890,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:38.558Z",
              "updateTimeMs": 2696,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:38.785Z",
              "updateTimeMs": 1549,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:38.802Z",
              "updateTimeMs": 3735,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:39.035Z",
              "updateTimeMs": 2574,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:39.626Z",
              "updateTimeMs": 1497,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:39.817Z",
              "updateTimeMs": 2372,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:40.389Z",
              "updateTimeMs": 1095,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:40.584Z",
              "updateTimeMs": 2672,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:41.113Z",
              "updateTimeMs": 4068,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:41.389Z",
              "updateTimeMs": 3676,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:41.408Z",
              "updateTimeMs": 4561,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:41.426Z",
              "updateTimeMs": 1314,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:41.652Z",
              "updateTimeMs": 3323,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:41.670Z",
              "updateTimeMs": 2755,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:41.699Z",
              "updateTimeMs": 3179,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:41.896Z",
              "updateTimeMs": 2576,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:42.432Z",
              "updateTimeMs": 1153,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:42.656Z",
              "updateTimeMs": 2893,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:43.153Z",
              "updateTimeMs": 2836,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:43.170Z",
              "updateTimeMs": 4453,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:43.416Z",
              "updateTimeMs": 3888,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:43.436Z",
              "updateTimeMs": 2925,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:43.455Z",
              "updateTimeMs": 1174,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:43.666Z",
              "updateTimeMs": 3754,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:43.685Z",
              "updateTimeMs": 4557,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:43.968Z",
              "updateTimeMs": 2513,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:44.224Z",
              "updateTimeMs": 3346,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:44.515Z",
              "updateTimeMs": 1226,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:44.533Z",
              "updateTimeMs": 2854,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:45.273Z",
              "updateTimeMs": 1579,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:45.293Z",
              "updateTimeMs": 4593,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:45.310Z",
              "updateTimeMs": 3432,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:45.553Z",
              "updateTimeMs": 4069,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:45.571Z",
              "updateTimeMs": 1493,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:45.797Z",
              "updateTimeMs": 2919,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:46.069Z",
              "updateTimeMs": 5006,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:46.310Z",
              "updateTimeMs": 2815,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:46.553Z",
              "updateTimeMs": 1489,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:46.572Z",
              "updateTimeMs": 4083,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:47.083Z",
              "updateTimeMs": 1848,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:47.326Z",
              "updateTimeMs": 3448,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:47.343Z",
              "updateTimeMs": 2847,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:47.597Z",
              "updateTimeMs": 3317,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:47.614Z",
              "updateTimeMs": 2202,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:47.633Z",
              "updateTimeMs": 5545,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:47.834Z",
              "updateTimeMs": 4738,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:47.853Z",
              "updateTimeMs": 5139,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:47.872Z",
              "updateTimeMs": 3201,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:48.624Z",
              "updateTimeMs": 3761,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:49.108Z",
              "updateTimeMs": 4130,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:50.903Z",
              "updateTimeMs": 779,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:52.724Z",
              "updateTimeMs": 778,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:54.544Z",
              "updateTimeMs": 807,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:56.351Z",
              "updateTimeMs": 790,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:58.149Z",
              "updateTimeMs": 783,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:17:59.931Z",
              "updateTimeMs": 767,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:01.755Z",
              "updateTimeMs": 813,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:03.600Z",
              "updateTimeMs": 783,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:05.417Z",
              "updateTimeMs": 807,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:07.223Z",
              "updateTimeMs": 796,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:09.034Z",
              "updateTimeMs": 800,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:10.983Z",
              "updateTimeMs": 940,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:12.769Z",
              "updateTimeMs": 775,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:14.619Z",
              "updateTimeMs": 798,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:16.412Z",
              "updateTimeMs": 782,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:18.297Z",
              "updateTimeMs": 875,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:20.201Z",
              "updateTimeMs": 892,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:22.078Z",
              "updateTimeMs": 853,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:23.857Z",
              "updateTimeMs": 769,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:25.661Z",
              "updateTimeMs": 792,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:27.487Z",
              "updateTimeMs": 793,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:29.260Z",
              "updateTimeMs": 762,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:31.053Z",
              "updateTimeMs": 782,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:32.843Z",
              "updateTimeMs": 780,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:34.662Z",
              "updateTimeMs": 810,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:36.526Z",
              "updateTimeMs": 817,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:38.364Z",
              "updateTimeMs": 809,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:40.193Z",
              "updateTimeMs": 801,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:41.994Z",
              "updateTimeMs": 792,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:43.821Z",
              "updateTimeMs": 796,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:45.632Z",
              "updateTimeMs": 790,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:47.513Z",
              "updateTimeMs": 834,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:49.329Z",
              "updateTimeMs": 793,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:51.145Z",
              "updateTimeMs": 801,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:52.948Z",
              "updateTimeMs": 789,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:54.767Z",
              "updateTimeMs": 794,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:56.693Z",
              "updateTimeMs": 881,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:18:58.569Z",
              "updateTimeMs": 848,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:00.440Z",
              "updateTimeMs": 847,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:02.389Z",
              "updateTimeMs": 873,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:04.272Z",
              "updateTimeMs": 869,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:06.198Z",
              "updateTimeMs": 869,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:08.022Z",
              "updateTimeMs": 814,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:09.803Z",
              "updateTimeMs": 761,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:11.606Z",
              "updateTimeMs": 794,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:13.398Z",
              "updateTimeMs": 777,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:15.197Z",
              "updateTimeMs": 782,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:17.020Z",
              "updateTimeMs": 797,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:18.845Z",
              "updateTimeMs": 812,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:20.683Z",
              "updateTimeMs": 794,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:22.463Z",
              "updateTimeMs": 770,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:24.269Z",
              "updateTimeMs": 793,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:26.040Z",
              "updateTimeMs": 757,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:27.849Z",
              "updateTimeMs": 782,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:29.668Z",
              "updateTimeMs": 805,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:31.504Z",
              "updateTimeMs": 806,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:33.315Z",
              "updateTimeMs": 802,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:35.121Z",
              "updateTimeMs": 796,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:36.921Z",
              "updateTimeMs": 790,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:38.714Z",
              "updateTimeMs": 777,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:40.493Z",
              "updateTimeMs": 769,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:42.341Z",
              "updateTimeMs": 835,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:44.114Z",
              "updateTimeMs": 764,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:45.925Z",
              "updateTimeMs": 800,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:47.733Z",
              "updateTimeMs": 785,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:49.547Z",
              "updateTimeMs": 804,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:51.362Z",
              "updateTimeMs": 800,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:53.240Z",
              "updateTimeMs": 798,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:55.090Z",
              "updateTimeMs": 841,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:56.901Z",
              "updateTimeMs": 801,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:19:58.709Z",
              "updateTimeMs": 782,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:20:00.511Z",
              "updateTimeMs": 792,
              "footprintBytes": 2107
            },
            {
              "observedAt": "2026-09-25T14:20:02.310Z",
              "updateTimeMs": 782,
              "footprintBytes": 2107
            }
          ],
          "failedQueries": [],
          "table": {
            "queries": 238,
            "failedQueries": 0,
            "queryLossPercent": 0,
            "footprintBytes": 2107,
            "averageUpdateTimeMs": 1442.09243697479,
            "meanDeviationMs": 823.6659840406714,
            "peakDeviationMs": 4102.90756302521
          }
        },
        {
          "instance": {
            "sourceId": "566bfffa-d5ae-41ab-a27d-c5ad3b427e5b",
            "name": "Firebase100-1000",
            "provider": "firebase"
          },
          "chart": [
            {
              "observedAt": "2026-09-25T14:15:25.239Z",
              "updateTimeMs": 1069,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:27.085Z",
              "updateTimeMs": 837,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:28.895Z",
              "updateTimeMs": 782,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:30.711Z",
              "updateTimeMs": 806,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:32.518Z",
              "updateTimeMs": 797,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:34.491Z",
              "updateTimeMs": 963,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:36.284Z",
              "updateTimeMs": 784,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:38.100Z",
              "updateTimeMs": 804,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:39.906Z",
              "updateTimeMs": 784,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:41.747Z",
              "updateTimeMs": 830,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:43.532Z",
              "updateTimeMs": 776,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:45.358Z",
              "updateTimeMs": 814,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:47.210Z",
              "updateTimeMs": 843,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:48.999Z",
              "updateTimeMs": 770,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:50.790Z",
              "updateTimeMs": 778,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:52.599Z",
              "updateTimeMs": 794,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:54.398Z",
              "updateTimeMs": 768,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:56.255Z",
              "updateTimeMs": 842,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:58.036Z",
              "updateTimeMs": 771,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:59.832Z",
              "updateTimeMs": 784,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:01.613Z",
              "updateTimeMs": 770,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:03.401Z",
              "updateTimeMs": 778,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:05.216Z",
              "updateTimeMs": 805,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:07.003Z",
              "updateTimeMs": 778,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:08.864Z",
              "updateTimeMs": 849,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:10.712Z",
              "updateTimeMs": 834,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:12.530Z",
              "updateTimeMs": 800,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:14.321Z",
              "updateTimeMs": 780,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:16.111Z",
              "updateTimeMs": 774,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:17.915Z",
              "updateTimeMs": 793,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:19.759Z",
              "updateTimeMs": 831,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:21.541Z",
              "updateTimeMs": 772,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:23.357Z",
              "updateTimeMs": 787,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:25.156Z",
              "updateTimeMs": 790,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:26.967Z",
              "updateTimeMs": 800,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:28.780Z",
              "updateTimeMs": 801,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:30.583Z",
              "updateTimeMs": 794,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:32.475Z",
              "updateTimeMs": 866,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:34.298Z",
              "updateTimeMs": 811,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:36.095Z",
              "updateTimeMs": 788,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:37.889Z",
              "updateTimeMs": 784,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:39.691Z",
              "updateTimeMs": 792,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:41.643Z",
              "updateTimeMs": 943,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:43.428Z",
              "updateTimeMs": 777,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:45.191Z",
              "updateTimeMs": 753,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:46.976Z",
              "updateTimeMs": 775,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:48.761Z",
              "updateTimeMs": 775,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:50.569Z",
              "updateTimeMs": 797,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:52.382Z",
              "updateTimeMs": 803,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:54.174Z",
              "updateTimeMs": 782,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:55.984Z",
              "updateTimeMs": 800,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:57.811Z",
              "updateTimeMs": 806,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:59.592Z",
              "updateTimeMs": 772,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:01.376Z",
              "updateTimeMs": 774,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:03.178Z",
              "updateTimeMs": 785,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:04.988Z",
              "updateTimeMs": 801,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:06.807Z",
              "updateTimeMs": 811,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:08.657Z",
              "updateTimeMs": 821,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:10.451Z",
              "updateTimeMs": 784,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:12.222Z",
              "updateTimeMs": 762,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:14.035Z",
              "updateTimeMs": 794,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:15.994Z",
              "updateTimeMs": 947,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:17.794Z",
              "updateTimeMs": 785,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:19.616Z",
              "updateTimeMs": 798,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:21.400Z",
              "updateTimeMs": 770,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:23.230Z",
              "updateTimeMs": 820,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:25.046Z",
              "updateTimeMs": 793,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:26.848Z",
              "updateTimeMs": 780,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:28.663Z",
              "updateTimeMs": 802,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:30.484Z",
              "updateTimeMs": 811,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:32.270Z",
              "updateTimeMs": 775,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:34.118Z",
              "updateTimeMs": 837,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:35.910Z",
              "updateTimeMs": 773,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:37.704Z",
              "updateTimeMs": 778,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:39.552Z",
              "updateTimeMs": 810,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:41.446Z",
              "updateTimeMs": 881,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:43.236Z",
              "updateTimeMs": 775,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:45.168Z",
              "updateTimeMs": 916,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:46.988Z",
              "updateTimeMs": 811,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:48.763Z",
              "updateTimeMs": 766,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:50.548Z",
              "updateTimeMs": 776,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:52.334Z",
              "updateTimeMs": 777,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:54.124Z",
              "updateTimeMs": 780,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:55.903Z",
              "updateTimeMs": 766,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:57.687Z",
              "updateTimeMs": 773,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:59.488Z",
              "updateTimeMs": 781,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:00.271Z",
              "updateTimeMs": 960,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:00.736Z",
              "updateTimeMs": 1934,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:01.054Z",
              "updateTimeMs": 940,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:01.502Z",
              "updateTimeMs": 1987,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:01.850Z",
              "updateTimeMs": 1025,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:02.101Z",
              "updateTimeMs": 2160,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:02.755Z",
              "updateTimeMs": 3043,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:02.772Z",
              "updateTimeMs": 2274,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:02.790Z",
              "updateTimeMs": 1579,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:03.023Z",
              "updateTimeMs": 2426,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:03.041Z",
              "updateTimeMs": 2680,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:03.061Z",
              "updateTimeMs": 2065,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:03.274Z",
              "updateTimeMs": 1620,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:04.047Z",
              "updateTimeMs": 1508,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:04.814Z",
              "updateTimeMs": 1031,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:05.107Z",
              "updateTimeMs": 2163,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:05.351Z",
              "updateTimeMs": 2170,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:05.606Z",
              "updateTimeMs": 1812,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:05.625Z",
              "updateTimeMs": 4189,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:06.264Z",
              "updateTimeMs": 2067,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:06.284Z",
              "updateTimeMs": 3548,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:06.304Z",
              "updateTimeMs": 2938,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:06.543Z",
              "updateTimeMs": 2566,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:07.029Z",
              "updateTimeMs": 1593,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:07.048Z",
              "updateTimeMs": 2665,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:07.291Z",
              "updateTimeMs": 3714,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:07.309Z",
              "updateTimeMs": 1292,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:08.030Z",
              "updateTimeMs": 1828,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:08.049Z",
              "updateTimeMs": 2414,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:08.310Z",
              "updateTimeMs": 1349,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:08.803Z",
              "updateTimeMs": 2035,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:09.070Z",
              "updateTimeMs": 1161,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:09.336Z",
              "updateTimeMs": 2716,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:09.356Z",
              "updateTimeMs": 2972,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:09.375Z",
              "updateTimeMs": 3546,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:10.145Z",
              "updateTimeMs": 1065,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:10.535Z",
              "updateTimeMs": 3008,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:10.556Z",
              "updateTimeMs": 3238,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:10.574Z",
              "updateTimeMs": 3458,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:10.751Z",
              "updateTimeMs": 2461,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:10.769Z",
              "updateTimeMs": 2682,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:10.797Z",
              "updateTimeMs": 4215,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:11.519Z",
              "updateTimeMs": 2091,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:11.826Z",
              "updateTimeMs": 1846,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:11.845Z",
              "updateTimeMs": 4119,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:12.060Z",
              "updateTimeMs": 3414,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:12.079Z",
              "updateTimeMs": 2834,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:12.340Z",
              "updateTimeMs": 3873,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:12.586Z",
              "updateTimeMs": 2788,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:12.836Z",
              "updateTimeMs": 1492,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:13.584Z",
              "updateTimeMs": 899,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:13.604Z",
              "updateTimeMs": 3993,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:13.943Z",
              "updateTimeMs": 3743,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:13.960Z",
              "updateTimeMs": 3549,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:13.977Z",
              "updateTimeMs": 2423,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:14.151Z",
              "updateTimeMs": 3767,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:14.173Z",
              "updateTimeMs": 2439,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:14.924Z",
              "updateTimeMs": 1807,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:14.943Z",
              "updateTimeMs": 4359,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:15.227Z",
              "updateTimeMs": 2344,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:15.776Z",
              "updateTimeMs": 1087,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:15.795Z",
              "updateTimeMs": 2301,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:16.006Z",
              "updateTimeMs": 5014,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:16.026Z",
              "updateTimeMs": 2710,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:16.261Z",
              "updateTimeMs": 4130,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:16.545Z",
              "updateTimeMs": 1050,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:16.794Z",
              "updateTimeMs": 4286,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:17.029Z",
              "updateTimeMs": 6251,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:17.049Z",
              "updateTimeMs": 3154,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:17.279Z",
              "updateTimeMs": 1009,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:17.296Z",
              "updateTimeMs": 5357,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:17.598Z",
              "updateTimeMs": 6421,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:17.618Z",
              "updateTimeMs": 3529,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:17.859Z",
              "updateTimeMs": 2179,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:18.067Z",
              "updateTimeMs": 2952,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:18.085Z",
              "updateTimeMs": 1006,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:18.326Z",
              "updateTimeMs": 6015,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:18.344Z",
              "updateTimeMs": 3847,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:18.592Z",
              "updateTimeMs": 2528,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:18.611Z",
              "updateTimeMs": 3716,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:18.879Z",
              "updateTimeMs": 4600,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:18.907Z",
              "updateTimeMs": 2417,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:19.114Z",
              "updateTimeMs": 1217,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:19.132Z",
              "updateTimeMs": 3255,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:19.151Z",
              "updateTimeMs": 3972,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:19.913Z",
              "updateTimeMs": 2230,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:20.231Z",
              "updateTimeMs": 1147,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:20.251Z",
              "updateTimeMs": 3585,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:20.270Z",
              "updateTimeMs": 3408,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:20.435Z",
              "updateTimeMs": 2339,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:20.455Z",
              "updateTimeMs": 3194,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:21.211Z",
              "updateTimeMs": 1496,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:21.465Z",
              "updateTimeMs": 2970,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:21.482Z",
              "updateTimeMs": 6175,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:21.746Z",
              "updateTimeMs": 3052,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:21.763Z",
              "updateTimeMs": 4283,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:21.990Z",
              "updateTimeMs": 2113,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:22.007Z",
              "updateTimeMs": 2726,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:22.290Z",
              "updateTimeMs": 2194,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:22.307Z",
              "updateTimeMs": 4029,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:22.531Z",
              "updateTimeMs": 3642,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:23.001Z",
              "updateTimeMs": 2789,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:23.527Z",
              "updateTimeMs": 3248,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:23.978Z",
              "updateTimeMs": 3514,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:23.997Z",
              "updateTimeMs": 4506,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:24.765Z",
              "updateTimeMs": 4067,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:25.027Z",
              "updateTimeMs": 1005,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:25.313Z",
              "updateTimeMs": 4435,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:26.841Z",
              "updateTimeMs": 794,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:28.637Z",
              "updateTimeMs": 785,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:30.440Z",
              "updateTimeMs": 792,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:32.233Z",
              "updateTimeMs": 783,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:34.077Z",
              "updateTimeMs": 823,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:35.934Z",
              "updateTimeMs": 839,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:37.808Z",
              "updateTimeMs": 859,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:39.649Z",
              "updateTimeMs": 823,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:41.487Z",
              "updateTimeMs": 829,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:43.345Z",
              "updateTimeMs": 825,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:45.158Z",
              "updateTimeMs": 800,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:46.994Z",
              "updateTimeMs": 807,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:48.795Z",
              "updateTimeMs": 792,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:50.580Z",
              "updateTimeMs": 774,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:52.357Z",
              "updateTimeMs": 763,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:54.149Z",
              "updateTimeMs": 779,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:55.997Z",
              "updateTimeMs": 834,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:57.928Z",
              "updateTimeMs": 921,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:59.844Z",
              "updateTimeMs": 866,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:01.758Z",
              "updateTimeMs": 896,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:03.626Z",
              "updateTimeMs": 840,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:05.544Z",
              "updateTimeMs": 887,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:07.426Z",
              "updateTimeMs": 865,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:09.251Z",
              "updateTimeMs": 812,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:11.068Z",
              "updateTimeMs": 795,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:12.886Z",
              "updateTimeMs": 799,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:14.688Z",
              "updateTimeMs": 793,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:16.475Z",
              "updateTimeMs": 778,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:18.290Z",
              "updateTimeMs": 798,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:20.085Z",
              "updateTimeMs": 780,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:21.877Z",
              "updateTimeMs": 781,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:23.653Z",
              "updateTimeMs": 767,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:25.437Z",
              "updateTimeMs": 775,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:27.292Z",
              "updateTimeMs": 845,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:29.095Z",
              "updateTimeMs": 792,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:30.934Z",
              "updateTimeMs": 828,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:32.720Z",
              "updateTimeMs": 773,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:34.530Z",
              "updateTimeMs": 800,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:36.340Z",
              "updateTimeMs": 788,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:38.121Z",
              "updateTimeMs": 772,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:39.898Z",
              "updateTimeMs": 768,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:41.705Z",
              "updateTimeMs": 773,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:43.526Z",
              "updateTimeMs": 805,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:45.360Z",
              "updateTimeMs": 816,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:47.167Z",
              "updateTimeMs": 791,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:48.956Z",
              "updateTimeMs": 774,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:50.767Z",
              "updateTimeMs": 778,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:52.615Z",
              "updateTimeMs": 809,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:54.412Z",
              "updateTimeMs": 771,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:56.217Z",
              "updateTimeMs": 778,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:58.017Z",
              "updateTimeMs": 784,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:59.798Z",
              "updateTimeMs": 770,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:20:01.601Z",
              "updateTimeMs": 792,
              "footprintBytes": 1000
            }
          ],
          "failedQueries": [],
          "table": {
            "queries": 247,
            "failedQueries": 0,
            "queryLossPercent": 0,
            "footprintBytes": 1000,
            "averageUpdateTimeMs": 1683.6315789473683,
            "meanDeviationMs": 1074.5237587896854,
            "peakDeviationMs": 4737.368421052632
          }
        },
        {
          "instance": {
            "sourceId": "50efbeb4-3450-4b01-8c02-ebd45bfe91b7",
            "name": "Mongo100-1000",
            "provider": "mongodb"
          },
          "chart": [
            {
              "observedAt": "2026-09-25T14:15:24.897Z",
              "updateTimeMs": 718,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:26.109Z",
              "updateTimeMs": 181,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:27.349Z",
              "updateTimeMs": 213,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:28.532Z",
              "updateTimeMs": 169,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:29.709Z",
              "updateTimeMs": 167,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:30.922Z",
              "updateTimeMs": 201,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:32.103Z",
              "updateTimeMs": 170,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:33.320Z",
              "updateTimeMs": 177,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:34.534Z",
              "updateTimeMs": 186,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:35.727Z",
              "updateTimeMs": 172,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:36.935Z",
              "updateTimeMs": 183,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:38.187Z",
              "updateTimeMs": 233,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:39.396Z",
              "updateTimeMs": 199,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:40.583Z",
              "updateTimeMs": 177,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:41.832Z",
              "updateTimeMs": 205,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:43.036Z",
              "updateTimeMs": 185,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:44.239Z",
              "updateTimeMs": 192,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:45.450Z",
              "updateTimeMs": 190,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:46.647Z",
              "updateTimeMs": 176,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:47.829Z",
              "updateTimeMs": 160,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:49.047Z",
              "updateTimeMs": 194,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:50.240Z",
              "updateTimeMs": 176,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:51.630Z",
              "updateTimeMs": 380,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:52.843Z",
              "updateTimeMs": 194,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:54.027Z",
              "updateTimeMs": 168,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:55.218Z",
              "updateTimeMs": 173,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:56.400Z",
              "updateTimeMs": 164,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:57.606Z",
              "updateTimeMs": 171,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:58.782Z",
              "updateTimeMs": 163,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:15:59.977Z",
              "updateTimeMs": 183,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:01.199Z",
              "updateTimeMs": 191,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:02.370Z",
              "updateTimeMs": 162,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:03.585Z",
              "updateTimeMs": 205,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:04.823Z",
              "updateTimeMs": 221,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:06.062Z",
              "updateTimeMs": 222,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:07.296Z",
              "updateTimeMs": 212,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:08.645Z",
              "updateTimeMs": 339,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:09.900Z",
              "updateTimeMs": 231,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:11.096Z",
              "updateTimeMs": 174,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:12.313Z",
              "updateTimeMs": 199,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:13.501Z",
              "updateTimeMs": 162,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:14.696Z",
              "updateTimeMs": 174,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:15.891Z",
              "updateTimeMs": 179,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:17.084Z",
              "updateTimeMs": 171,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:18.288Z",
              "updateTimeMs": 178,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:19.552Z",
              "updateTimeMs": 249,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:20.728Z",
              "updateTimeMs": 164,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:21.917Z",
              "updateTimeMs": 172,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:23.129Z",
              "updateTimeMs": 203,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:24.310Z",
              "updateTimeMs": 172,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:25.641Z",
              "updateTimeMs": 322,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:26.820Z",
              "updateTimeMs": 161,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:28.010Z",
              "updateTimeMs": 171,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:29.190Z",
              "updateTimeMs": 170,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:30.430Z",
              "updateTimeMs": 229,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:31.652Z",
              "updateTimeMs": 211,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:32.875Z",
              "updateTimeMs": 188,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:34.059Z",
              "updateTimeMs": 174,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:35.243Z",
              "updateTimeMs": 176,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:36.411Z",
              "updateTimeMs": 158,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:37.584Z",
              "updateTimeMs": 161,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:38.782Z",
              "updateTimeMs": 184,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:39.951Z",
              "updateTimeMs": 159,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:41.147Z",
              "updateTimeMs": 186,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:42.336Z",
              "updateTimeMs": 180,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:43.519Z",
              "updateTimeMs": 171,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:44.720Z",
              "updateTimeMs": 191,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:45.925Z",
              "updateTimeMs": 171,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:47.096Z",
              "updateTimeMs": 162,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:48.267Z",
              "updateTimeMs": 161,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:49.460Z",
              "updateTimeMs": 183,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:50.669Z",
              "updateTimeMs": 185,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:51.847Z",
              "updateTimeMs": 168,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:53.035Z",
              "updateTimeMs": 165,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:54.220Z",
              "updateTimeMs": 174,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:55.394Z",
              "updateTimeMs": 164,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:56.571Z",
              "updateTimeMs": 168,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:57.741Z",
              "updateTimeMs": 161,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:16:58.928Z",
              "updateTimeMs": 167,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:00.099Z",
              "updateTimeMs": 162,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:01.286Z",
              "updateTimeMs": 168,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:02.479Z",
              "updateTimeMs": 179,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:03.682Z",
              "updateTimeMs": 175,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:04.879Z",
              "updateTimeMs": 183,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:06.095Z",
              "updateTimeMs": 205,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:07.298Z",
              "updateTimeMs": 194,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:08.557Z",
              "updateTimeMs": 222,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:09.794Z",
              "updateTimeMs": 212,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:11.008Z",
              "updateTimeMs": 192,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:12.188Z",
              "updateTimeMs": 171,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:13.412Z",
              "updateTimeMs": 214,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:14.607Z",
              "updateTimeMs": 167,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:15.946Z",
              "updateTimeMs": 330,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:17.130Z",
              "updateTimeMs": 172,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:18.336Z",
              "updateTimeMs": 184,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:19.577Z",
              "updateTimeMs": 201,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:20.770Z",
              "updateTimeMs": 183,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:21.984Z",
              "updateTimeMs": 166,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:23.266Z",
              "updateTimeMs": 258,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:24.499Z",
              "updateTimeMs": 219,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:25.704Z",
              "updateTimeMs": 195,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:26.884Z",
              "updateTimeMs": 169,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:28.120Z",
              "updateTimeMs": 225,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:29.303Z",
              "updateTimeMs": 172,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:30.501Z",
              "updateTimeMs": 186,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:31.692Z",
              "updateTimeMs": 182,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:32.878Z",
              "updateTimeMs": 163,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:34.099Z",
              "updateTimeMs": 212,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:35.339Z",
              "updateTimeMs": 230,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:36.528Z",
              "updateTimeMs": 179,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:37.833Z",
              "updateTimeMs": 213,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:39.083Z",
              "updateTimeMs": 208,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:40.258Z",
              "updateTimeMs": 166,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:41.474Z",
              "updateTimeMs": 204,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:42.733Z",
              "updateTimeMs": 208,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:43.951Z",
              "updateTimeMs": 203,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:45.148Z",
              "updateTimeMs": 187,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:46.329Z",
              "updateTimeMs": 169,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:47.522Z",
              "updateTimeMs": 170,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:48.711Z",
              "updateTimeMs": 179,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:49.897Z",
              "updateTimeMs": 177,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:51.122Z",
              "updateTimeMs": 182,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:52.296Z",
              "updateTimeMs": 163,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:53.502Z",
              "updateTimeMs": 190,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:54.673Z",
              "updateTimeMs": 162,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:55.848Z",
              "updateTimeMs": 166,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:57.055Z",
              "updateTimeMs": 196,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:58.233Z",
              "updateTimeMs": 168,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:17:59.412Z",
              "updateTimeMs": 168,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:00.586Z",
              "updateTimeMs": 165,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:01.792Z",
              "updateTimeMs": 189,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:03.004Z",
              "updateTimeMs": 178,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:04.217Z",
              "updateTimeMs": 203,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:05.398Z",
              "updateTimeMs": 165,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:06.610Z",
              "updateTimeMs": 193,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:07.818Z",
              "updateTimeMs": 198,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:08.986Z",
              "updateTimeMs": 154,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:10.449Z",
              "updateTimeMs": 454,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:11.696Z",
              "updateTimeMs": 236,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:12.914Z",
              "updateTimeMs": 191,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:14.193Z",
              "updateTimeMs": 269,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:15.372Z",
              "updateTimeMs": 165,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:16.580Z",
              "updateTimeMs": 198,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:18.135Z",
              "updateTimeMs": 491,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:19.364Z",
              "updateTimeMs": 203,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:20.598Z",
              "updateTimeMs": 223,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:21.820Z",
              "updateTimeMs": 212,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:23.020Z",
              "updateTimeMs": 171,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:24.240Z",
              "updateTimeMs": 187,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:25.487Z",
              "updateTimeMs": 197,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:26.668Z",
              "updateTimeMs": 171,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:27.871Z",
              "updateTimeMs": 190,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:29.041Z",
              "updateTimeMs": 161,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:30.219Z",
              "updateTimeMs": 169,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:31.412Z",
              "updateTimeMs": 183,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:32.610Z",
              "updateTimeMs": 159,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:33.611Z",
              "updateTimeMs": 160,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:33.796Z",
              "updateTimeMs": 175,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:33.882Z",
              "updateTimeMs": 244,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:34.058Z",
              "updateTimeMs": 223,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:34.240Z",
              "updateTimeMs": 223,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:34.392Z",
              "updateTimeMs": 171,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:34.634Z",
              "updateTimeMs": 189,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:34.811Z",
              "updateTimeMs": 168,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:34.984Z",
              "updateTimeMs": 163,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:35.086Z",
              "updateTimeMs": 252,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:35.392Z",
              "updateTimeMs": 348,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:35.605Z",
              "updateTimeMs": 362,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:35.663Z",
              "updateTimeMs": 217,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:35.826Z",
              "updateTimeMs": 186,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:36.018Z",
              "updateTimeMs": 183,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:36.179Z",
              "updateTimeMs": 179,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:36.337Z",
              "updateTimeMs": 311,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:36.377Z",
              "updateTimeMs": 189,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:36.583Z",
              "updateTimeMs": 196,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:36.773Z",
              "updateTimeMs": 209,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:36.930Z",
              "updateTimeMs": 175,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:37.109Z",
              "updateTimeMs": 170,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:37.309Z",
              "updateTimeMs": 191,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:37.456Z",
              "updateTimeMs": 240,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:37.488Z",
              "updateTimeMs": 205,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:37.659Z",
              "updateTimeMs": 190,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:37.891Z",
              "updateTimeMs": 281,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:38.031Z",
              "updateTimeMs": 247,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:38.158Z",
              "updateTimeMs": 208,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:38.325Z",
              "updateTimeMs": 187,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:38.527Z",
              "updateTimeMs": 223,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:38.679Z",
              "updateTimeMs": 185,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:38.816Z",
              "updateTimeMs": 308,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:38.858Z",
              "updateTimeMs": 244,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:39.005Z",
              "updateTimeMs": 228,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:39.365Z",
              "updateTimeMs": 415,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:39.543Z",
              "updateTimeMs": 414,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:39.601Z",
              "updateTimeMs": 323,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:39.669Z",
              "updateTimeMs": 237,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:39.839Z",
              "updateTimeMs": 257,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:40.003Z",
              "updateTimeMs": 257,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:40.031Z",
              "updateTimeMs": 182,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:40.238Z",
              "updateTimeMs": 342,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:40.278Z",
              "updateTimeMs": 230,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:40.415Z",
              "updateTimeMs": 196,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:40.595Z",
              "updateTimeMs": 220,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:40.745Z",
              "updateTimeMs": 215,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:40.912Z",
              "updateTimeMs": 215,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:41.071Z",
              "updateTimeMs": 209,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:41.224Z",
              "updateTimeMs": 194,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:41.384Z",
              "updateTimeMs": 335,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:41.406Z",
              "updateTimeMs": 214,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:41.584Z",
              "updateTimeMs": 236,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:41.742Z",
              "updateTimeMs": 203,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:41.893Z",
              "updateTimeMs": 192,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:42.061Z",
              "updateTimeMs": 188,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:42.208Z",
              "updateTimeMs": 165,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:42.409Z",
              "updateTimeMs": 191,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:42.592Z",
              "updateTimeMs": 230,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:42.713Z",
              "updateTimeMs": 291,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:42.741Z",
              "updateTimeMs": 211,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:42.943Z",
              "updateTimeMs": 255,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:43.077Z",
              "updateTimeMs": 231,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:43.240Z",
              "updateTimeMs": 226,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:43.407Z",
              "updateTimeMs": 213,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:43.534Z",
              "updateTimeMs": 179,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:43.701Z",
              "updateTimeMs": 193,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:43.872Z",
              "updateTimeMs": 211,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:43.996Z",
              "updateTimeMs": 268,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:44.013Z",
              "updateTimeMs": 183,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:44.221Z",
              "updateTimeMs": 260,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:44.333Z",
              "updateTimeMs": 208,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:44.470Z",
              "updateTimeMs": 195,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:44.630Z",
              "updateTimeMs": 214,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:44.794Z",
              "updateTimeMs": 226,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:44.887Z",
              "updateTimeMs": 182,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:45.047Z",
              "updateTimeMs": 195,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:45.213Z",
              "updateTimeMs": 206,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:45.341Z",
              "updateTimeMs": 325,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:45.391Z",
              "updateTimeMs": 223,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:45.539Z",
              "updateTimeMs": 225,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:45.690Z",
              "updateTimeMs": 213,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:45.980Z",
              "updateTimeMs": 330,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:46.139Z",
              "updateTimeMs": 343,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:46.300Z",
              "updateTimeMs": 356,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:46.318Z",
              "updateTimeMs": 223,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:46.448Z",
              "updateTimeMs": 221,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:46.612Z",
              "updateTimeMs": 363,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:46.665Z",
              "updateTimeMs": 254,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:46.829Z",
              "updateTimeMs": 247,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:47.012Z",
              "updateTimeMs": 258,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:47.163Z",
              "updateTimeMs": 235,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:47.244Z",
              "updateTimeMs": 176,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:47.618Z",
              "updateTimeMs": 161,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:48.812Z",
              "updateTimeMs": 185,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:50.005Z",
              "updateTimeMs": 174,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:51.190Z",
              "updateTimeMs": 169,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:52.405Z",
              "updateTimeMs": 190,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:53.589Z",
              "updateTimeMs": 175,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:54.790Z",
              "updateTimeMs": 185,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:56.075Z",
              "updateTimeMs": 254,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:57.541Z",
              "updateTimeMs": 446,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:18:58.751Z",
              "updateTimeMs": 201,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:00.198Z",
              "updateTimeMs": 435,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:01.533Z",
              "updateTimeMs": 325,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:02.766Z",
              "updateTimeMs": 219,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:04.071Z",
              "updateTimeMs": 281,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:05.388Z",
              "updateTimeMs": 308,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:06.691Z",
              "updateTimeMs": 288,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:07.909Z",
              "updateTimeMs": 205,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:09.099Z",
              "updateTimeMs": 161,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:10.296Z",
              "updateTimeMs": 187,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:11.523Z",
              "updateTimeMs": 180,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:12.857Z",
              "updateTimeMs": 316,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:14.082Z",
              "updateTimeMs": 199,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:15.318Z",
              "updateTimeMs": 180,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:16.519Z",
              "updateTimeMs": 186,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:17.736Z",
              "updateTimeMs": 196,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:19.173Z",
              "updateTimeMs": 423,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:20.357Z",
              "updateTimeMs": 171,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:21.547Z",
              "updateTimeMs": 180,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:22.748Z",
              "updateTimeMs": 186,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:23.956Z",
              "updateTimeMs": 199,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:25.138Z",
              "updateTimeMs": 171,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:26.336Z",
              "updateTimeMs": 183,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:27.512Z",
              "updateTimeMs": 166,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:28.712Z",
              "updateTimeMs": 186,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:29.941Z",
              "updateTimeMs": 207,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:31.133Z",
              "updateTimeMs": 154,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:32.326Z",
              "updateTimeMs": 166,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:33.509Z",
              "updateTimeMs": 165,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:34.742Z",
              "updateTimeMs": 186,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:35.922Z",
              "updateTimeMs": 166,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:37.126Z",
              "updateTimeMs": 174,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:38.329Z",
              "updateTimeMs": 179,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:39.542Z",
              "updateTimeMs": 189,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:40.727Z",
              "updateTimeMs": 177,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:41.909Z",
              "updateTimeMs": 173,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:43.082Z",
              "updateTimeMs": 164,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:44.249Z",
              "updateTimeMs": 156,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:45.478Z",
              "updateTimeMs": 203,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:46.702Z",
              "updateTimeMs": 187,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:47.908Z",
              "updateTimeMs": 194,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:49.247Z",
              "updateTimeMs": 331,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:50.459Z",
              "updateTimeMs": 171,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:51.657Z",
              "updateTimeMs": 171,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:52.869Z",
              "updateTimeMs": 202,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:54.060Z",
              "updateTimeMs": 181,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:55.255Z",
              "updateTimeMs": 183,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:56.464Z",
              "updateTimeMs": 197,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:57.653Z",
              "updateTimeMs": 166,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:58.817Z",
              "updateTimeMs": 154,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:19:59.996Z",
              "updateTimeMs": 162,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:20:01.181Z",
              "updateTimeMs": 164,
              "footprintBytes": 1000
            },
            {
              "observedAt": "2026-09-25T14:20:02.363Z",
              "updateTimeMs": 167,
              "footprintBytes": 1000
            }
          ],
          "failedQueries": [],
          "table": {
            "queries": 311,
            "failedQueries": 0,
            "queryLossPercent": 0,
            "footprintBytes": 1000,
            "averageUpdateTimeMs": 209.11254019292605,
            "meanDeviationMs": 40.34282110400013,
            "peakDeviationMs": 508.8874598070739
          }
        }
      ]
    }
  ]
};
