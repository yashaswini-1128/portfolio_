import os
from pypdf import PdfReader

pdf_path = os.path.join("assets", "documents", "resume.pdf")

try:
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    with open("resume_text.txt", "w", encoding="utf-8") as f:
        f.write(text)
    print("Done writing to resume_text.txt")
except Exception as e:
    print(f"Error reading PDF: {e}")
