module.exports = {

  PDFKIT : require("pdfkit"),

  fs : require("fs"),

  pdf_path: "pdfs/",

  x: 40,
  y: 50,

  init : function(){

    var pdf = new this.PDFKIT();

    pdf.pipe (this.fs.createWriteStream( this.pdf_path + 'test.pdf'));

    pdf = this.generatePDFHeader(pdf);

    this.end(pdf);

  },

  generatePDFHeader: function(pdf){

    pdf.font("Helvetica-Bold", 9)
      .fillColor("#404040")
      .text('SERVICE BILLING', this.x, this.y, {underline: true})
      .text('No.:')
      .font("Helvetica", 9)
      .text('Invoice Number Here!', (this.y + 20), (this.y + 10))
      .font("Helvetica-Bold", 9)
      .text('Date:', this.x)
      .font("Helvetica", 9)      
      .text('Invoice Date Here!', (this.y + 20), (this.y + 20));

    pdf.font("Helvetica-Bold", 9)
      .fillColor("#404040")
      .text('CLIENT DETAILS', this.x, (this.y + 60), {underline: true})
      .text('Name:')
      .font("Helvetica", 9)
      .text('Client Address', (this.y + 48), (this.y + 70))
      .font("Helvetica-Bold", 9)
      .text('Address:', this.x)
      .font("Helvetica", 9)      
      .text('Invoice Date Here!', (this.y + 48), (this.y + 80))
      .font("Helvetica-Bold", 9)      
      .text('Contact No.:', this.x)
      .font("Helvetica", 9)          
      .text('Invoice Date Here!', (this.y + 48), (this.y + 90));

    return pdf;

  },

  end: function(pdf){
    pdf.end();
    return pdf;
  }




}