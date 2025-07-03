import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (element: HTMLElement, filename: string = 'resume') => {
  try {
    // A4 dimensions in mm
    const A4_WIDTH = 210;
    const A4_HEIGHT = 297;
    const MARGIN = 5; // Standard margin
    const CONTENT_WIDTH = A4_WIDTH - (MARGIN * 2);
    const CONTENT_HEIGHT = A4_HEIGHT - (MARGIN * 2);

    // Find the actual resume content (not the preview wrapper)
    const resumeContent = element.querySelector('.resume-preview') as HTMLElement;
    if (!resumeContent) {
      throw new Error('Resume content not found');
    }

    // Create a temporary container for PDF export
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '210mm'; // A4 width
    tempContainer.style.maxWidth = 'none';
    tempContainer.style.backgroundColor = 'white';
    tempContainer.style.padding = '0';
    tempContainer.style.margin = '0';
    
    // Clone the resume content
    const clonedContent = resumeContent.cloneNode(true) as HTMLElement;
    clonedContent.style.maxWidth = 'none';
    clonedContent.style.width = '100%';
    clonedContent.style.transform = 'none';
    clonedContent.style.margin = '0';
    clonedContent.style.boxShadow = 'none';
    
    tempContainer.appendChild(clonedContent);
    document.body.appendChild(tempContainer);

    // Create canvas from the temporary container
    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      scrollX: 0,
      scrollY: 0,
      width: tempContainer.scrollWidth,
      height: tempContainer.scrollHeight,
    });

    // Clean up temporary container
    document.body.removeChild(tempContainer);

    // Calculate scaling to fit A4 page
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Convert pixels to mm (96 DPI standard)
    const pixelsToMm = 25.4 / 96;
    const canvasWidthMm = canvasWidth * pixelsToMm;
    const canvasHeightMm = canvasHeight * pixelsToMm;
    
    // Calculate scale to fit the content properly
    const scaleX = CONTENT_WIDTH / canvasWidthMm;
    const scaleY = CONTENT_HEIGHT / canvasHeightMm;
    
    // Use the smaller scale to ensure everything fits
    const scale = scaleX;
    
    // Calculate final dimensions in mm
    const finalWidth = canvasWidthMm * scale;
    const finalHeight = canvasHeightMm * scale;

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Center the content horizontally, start from top margin
    const xOffset = MARGIN;
    const yOffset = MARGIN;

    // Check if content fits on one page
    if (finalHeight <= CONTENT_HEIGHT) {
      // Single page
      pdf.addImage(
        canvas.toDataURL('image/png', 0.95), 
        'PNG', 
        xOffset, 
        yOffset, 
        finalWidth, 
        finalHeight
      );
    } else {
      // Multiple pages needed
      let remainingHeight = finalHeight;
      let currentSourceY = 0;
      let pageCount = 0;

      while (remainingHeight > 0) {
        if (pageCount > 0) {
          pdf.addPage();
        }

        // Calculate how much content fits on this page
        const pageContentHeight = Math.min(remainingHeight, CONTENT_HEIGHT);
        
        // Calculate source canvas crop area
        const sourceHeight = (pageContentHeight / finalHeight) * canvasHeight;

        // Create a cropped canvas for this page
        const pageCanvas = document.createElement('canvas');
        const pageCtx = pageCanvas.getContext('2d');
        
        pageCanvas.width = canvasWidth;
        pageCanvas.height = sourceHeight;
        
        if (pageCtx) {
          pageCtx.fillStyle = '#ffffff';
          pageCtx.fillRect(0, 0, canvasWidth, sourceHeight);
          pageCtx.drawImage(
            canvas,
            0, currentSourceY, canvasWidth, sourceHeight,
            0, 0, canvasWidth, sourceHeight
          );
        }

        // Add the cropped image to PDF
        pdf.addImage(
          pageCanvas.toDataURL('image/png', 0.95),
          'PNG',
          xOffset,
          yOffset,
          finalWidth,
          pageContentHeight
        );

        remainingHeight -= CONTENT_HEIGHT;
        currentSourceY += sourceHeight;
        pageCount++;
      }
    }

    // Save the PDF
    const cleanFilename = filename.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    pdf.save(`${cleanFilename}_resume.pdf`);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};