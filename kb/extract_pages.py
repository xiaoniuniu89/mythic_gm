import sys
from pypdf import PdfReader

def extract_pages(pdf_path, start_page, end_page, output_txt_path=None):
    """
    Extract pages from pdf_path (1-based index, inclusive).
    """
    reader = PdfReader(pdf_path)
    num_pages = len(reader.pages)
    
    # Convert 1-based to 0-based
    start_idx = max(0, start_page - 1)
    end_idx = min(num_pages, end_page)
    
    extracted_text = []
    for i in range(start_idx, end_idx):
        text = reader.pages[i].extract_text()
        extracted_text.append(f"--- PAGE {i+1} ---\n{text if text else '[No Text]'}\n")
        
    full_text = "\n".join(extracted_text)
    if output_txt_path:
        with open(output_txt_path, "w", encoding="utf-8") as f:
            f.write(full_text)
        print(f"Extracted pages {start_page} to {end_page} -> {output_txt_path}")
    else:
        print(full_text)

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python3 extract_pages.py <pdf_path> <start_page> <end_page> [output_txt_path]")
        sys.exit(1)
        
    pdf = sys.argv[1]
    start = int(sys.argv[2])
    end = int(sys.argv[3])
    out = sys.argv[4] if len(sys.argv) > 4 else None
    
    extract_pages(pdf, start, end, out)
