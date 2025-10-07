const Transaction = require("../models/transaction.model");
const dohoneApiService = require("../services/dohone.service");

class PaymentController {
  async billEnquiry(req, res) {
    const {
      intent,
      createtime,
      walletsource,
      issuertrxref,
      tomember,
      fromember,
      vouchercode,
      billInquiryData,
    } = req.body;
    if (
      !intent ||
      !createtime ||
      !walletsource ||
      !issuertrxref ||
      !tomember ||
      !fromember ||
      !vouchercode ||
      !billInquiryData
    ) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields",
        success: false,
      });
    }
    try {
      const response = dohoneApiService.call("/payment/send", {
        intent,
        createtime,
        walletsource,
        issuertrxref,
        tomember,
        fromember,
        vouchercode,
        billInquiryData,
      });

      console.log("response get ", response);

      return res.status(200).json({
        status: "success",
        message: "Bill enquiry successful",
        success: true,
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
        success: false,
      });
    }
  }
}

module.exports = new PaymentController();
