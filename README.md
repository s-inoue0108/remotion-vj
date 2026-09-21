# Remotion-VJ

Rendering DJ mix audio into a VJ video.

## Rendering

```bash
npx remotion render wav2vj out.mp4 --props='{"path":"sample"}'
```

asset directory structure:

```
/public/samples/
├── covers/
│   ├── sample1.jpg
│   └── sample2.png
├── metadata.json
└── sample.wav
```

Content of `metadata.json`:

```json
{
    "title": "Sample Mix",
    "audio": "sample.wav",
    "date": "YYYY-MM-DD",
    "tracks": [
        {
            "title": "Sample1",
            "composer": "sample-1",
            "cover": "covers/sample1.jpg",
            "duration": {
                "start": 0,
                "end": 60
            }
        },
        {
            "title": "Sample2",
            "composer": "sample-2",
            "cover": "covers/sample2.png",
            "duration": {
                "start": 60,
                "end": 120
            }
        }
    ]
}
```