#!/usr/bin/env python3
import re
import sys

def reformat_module_styling(html_content, module_number, module_title):
    """
    Carefully reformat module content to match Module 10's styling:
    - White title section with bold black text
    - Pale green (#BEFFD1) learning objectives
    - Rose (#fee2e2) conclusion
    """
    
    # Remove DOCTYPE, html, head, body tags and style sections
    html_content = re.sub(r'<!DOCTYPE[^>]*>', '', html_content, flags=re.IGNORECASE)
    html_content = re.sub(r'<html[^>]*>', '', html_content, flags=re.IGNORECASE)
    html_content = re.sub(r'</html>', '', html_content, flags=re.IGNORECASE)
    html_content = re.sub(r'<head[^>]*>.*?</head>', '', html_content, flags=re.DOTALL|re.IGNORECASE)
    html_content = re.sub(r'<body[^>]*>', '', html_content, flags=re.IGNORECASE)
    html_content = re.sub(r'</body>', '', html_content, flags=re.IGNORECASE)
    html_content = re.sub(r'<style[^>]*>.*?</style>', '', html_content, flags=re.DOTALL|re.IGNORECASE)
    
    # Wrap in main container if not already wrapped
    if not html_content.strip().startswith('<div'):
        html_content = f'<div class="module-content">{html_content}</div>'
    
    # Find and replace the title section (first h1)
    def replace_title(match):
        title_text = re.sub(r'<[^>]*>', '', match.group(1)).strip()
        if not title_text:
            title_text = f"Module {module_number}: {module_title}"
        
        return f'''<div style="background: white; padding: 40px; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
  <h1 style="margin: 0 0 20px 0; font-size: 2.5em; font-weight: 700; color: black;">{title_text}</h1>
  <p style="font-size: 1.2em; margin: 0; color: #333;">Advanced Construction Management and Civil Engineering Practice</p>
</div>'''
    
    # Replace title sections - look for various patterns
    html_content = re.sub(
        r'<div[^>]*>\s*<h1[^>]*>(.*?)</h1>.*?</div>',
        replace_title,
        html_content,
        count=1,
        flags=re.DOTALL
    )
    
    # Find and replace learning objectives section
    def replace_learning_objectives(match):
        content = match.group(1)
        # Extract list items
        li_items = re.findall(r'<li[^>]*>(.*?)</li>', content, flags=re.DOTALL)
        clean_items = [re.sub(r'<[^>]*>', '', item).strip() for item in li_items]
        
        items_html = '\n'.join([f'    <li>{item}</li>' for item in clean_items if item])
        
        return f'''<div style="background: #BEFFD1; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
  <h2 style="margin: 0 0 20px 0; font-size: 1.8em; color: black; font-weight: bold;">🎯 Learning Objectives</h2>
  <ul style="margin: 0; padding-left: 20px; font-size: 1.05em; line-height: 1.8; color: black;">
{items_html}
  </ul>
</div>'''
    
    # Replace learning objectives - various patterns
    html_content = re.sub(
        r'<(?:section|div)[^>]*learning[-_]objectives[^>]*>.*?<h2[^>]*>.*?Learning Objectives.*?</h2>(.*?)</(?:section|div)>',
        replace_learning_objectives,
        html_content,
        flags=re.DOTALL|re.IGNORECASE
    )
    
    # Find and replace conclusion section
    def replace_conclusion(match):
        content = match.group(1)
        return f'''<div style="background: #fee2e2; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
  <h2 style="margin: 0 0 20px 0; color: black; font-weight: bold;">🎓 Conclusion</h2>
{content}
</div>'''
    
    # Replace conclusion sections
    html_content = re.sub(
        r'<div[^>]*>\s*<h2[^>]*>.*?Conclusion.*?</h2>(.*?)</div>',
        replace_conclusion,
        html_content,
        flags=re.DOTALL|re.IGNORECASE
    )
    
    # Wrap everything in the standard container
    result = f'''
<div style="font-family: system-ui, -apple-system, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; line-height: 1.6;">

{html_content.strip()}

</div>
'''
    
    return result

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: script.py <input_file> <output_file> <module_number>")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    module_number = int(sys.argv[3])
    
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Get module title from content or use default
    title_match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
    module_title = re.sub(r'<[^>]*>', '', title_match.group(1)).strip() if title_match else f"Module {module_number}"
    
    reformatted = reformat_module_styling(content, module_number, module_title)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(reformatted)
    
    print(f"Module {module_number} reformatted successfully")
