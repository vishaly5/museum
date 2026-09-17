import os

audio_dir = r'C:\Users\009\Desktop\Anuvadini_Projects\museum\museum\RemainingGalleries\Audios'

for root, dirs, files in os.walk(audio_dir):
    for f in files:
        rel = os.path.relpath(os.path.join(root, f), audio_dir)
        print(rel)

