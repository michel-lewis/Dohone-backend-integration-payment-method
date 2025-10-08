const Transaction = require("../models/transaction.model");
const dohoneApiService = require("../services/dohone.service");

class PaymentController {
  async sendPayment(req, res) {
    const {
      intent,
      createtime,
      walletsource,
      issuertrxref,
      tomember,
      fromember,
      vouchercode,
      billInquiryData,
      amount,
      currency,
      billList,
      notifyUrl,
      acquirertrxref,
      asynchrone,
      logo,
      walletdestination,
      receivercustomerdata
    } = req.body;

    // Validation de l'intent
    if (!intent) {
      return res.status(400).json({
        status: "error",
        message: "intent is required",
        success: false,
      });
    }

    // Liste des intents valides
    const validIntents = ["bill_inquiry", "bill_payment", "request_to_pay", "bill_new", "cash_in"];
    if (!validIntents.includes(intent)) {
      return res.status(400).json({
        status: "error",
        message: `Invalid intent. Allowed: ${validIntents.join(", ")}`,
        success: false,
      });
    }

    // Validation des champs selon l'intent
    if (intent === "bill_inquiry") {
      if (!createtime || !walletsource || !issuertrxref || !tomember || !fromember || !vouchercode || !billInquiryData) {
        return res.status(400).json({
          status: "error",
          message: "Missing required fields for bill_inquiry",
          success: false,
        });
      }
    } else if (intent === "bill_payment") {
      if (!createtime || !walletsource || !amount || !currency || !billList || !issuertrxref || !tomember || !fromember || !vouchercode) {
        return res.status(400).json({
          status: "error",
          message: "Missing required fields for bill_payment",
          success: false,
        });
      }
    } else if (intent === "request_to_pay") {
      if (!createtime || !walletsource || !amount || !issuertrxref || !tomember) {
        return res.status(400).json({
          status: "error",
          message: "Missing required fields for request_to_pay",
          success: false,
        });
      }
    } else if (intent === "bill_new") {
      if (!createtime || !amount || !issuertrxref) {
        return res.status(400).json({
          status: "error",
          message: "Missing required fields for bill_new",
          success: false,
        });
      }
    } else if (intent === "cash_in") {
      if (!amount || !issuertrxref || !walletdestination || !notifyUrl || !receivercustomerdata || !tomember) {
        return res.status(400).json({
          status: "error",
          message: "Missing required fields for cash_in",
          success: false,
        });
      }
    }

    // Si on arrive ici, tout est valide, on continue vers l'API
    try {
      const response = await dohoneApiService.call("/payment/send", {
        intent,
        createtime,
        walletsource,
        issuertrxref,
        tomember,
        fromember,
        vouchercode,
        billInquiryData,
        amount,
        currency,
        billList,
        notifyUrl,
        acquirertrxref,
        asynchrone,
        logo,
        walletdestination,
        receivercustomerdata
      });

      if (response.error || response.state === "REJECTED") {
        return res.status(400).json({
          status: "error",
          message: response.error_description || response.error,
          success: false,
        });
      }

      return res.status(200).json({
        data: response,
      });
    } catch (error) {
      console.log("error get ", error);
      return res.status(500).json({
        data: error,
      });
    }
  }

  async webpayment (req, res) {
     // Path parameters (dans l'URL)
     const { acquirertrxref, operatorID } = req.params;
     
     // Query parameters (après le ?)
     const { cancelPage, endPage, wallet } = req.query;
  
     // Validation: acquirertrxref est obligatoire
     if (!acquirertrxref) {
        return res.status(400).json({
            status: "error",
            message: "acquirertrxref is required",
            success: false,
          });
     }

     try {
        // Construction de l'URL selon si operatorID est présent ou non
        const endpoint = operatorID 
          ? `/pay/${acquirertrxref}/${operatorID}` 
          : `/pay/${acquirertrxref}`;
        
        // Construction des query params
        const queryParams = new URLSearchParams();
        if (cancelPage) queryParams.append('cancelPage', cancelPage);
        if (endPage) queryParams.append('endPage', endPage);
        if (wallet) queryParams.append('wallet', wallet);
        
        const fullEndpoint = queryParams.toString() 
          ? `${endpoint}?${queryParams.toString()}` 
          : endpoint;

        const response = await dohoneApiService.call(fullEndpoint, null, { method: 'GET' });

        if (response.error || response.state === "REJECTED") {
          return res.status(400).json({
            status: "error",
            message: response.error_description || response.error,
            success: false,
          });
        }

        return res.status(200).json({
          data: response,
        });
     } catch (error) {
        console.log("error webpayment", error);
        return res.status(500).json({
          status: "error",
          message: error.message,
          success: false,
        });
     } 
  }
}

module.exports = new PaymentController();
