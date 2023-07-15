import axios from "axios";
import WireTransfersRequest from "../models/WireTransfersRequest";
import WireTransfer from "../models/WireTransfer";

const baseUrl = "http://localhost:8080"

export const wireTransferApi = {
  fetchWireTransfers: async (wireTransferRequest: WireTransfersRequest | null) => {
    return axios.get(`${baseUrl}/transfers`, {
      params: {
        startDate: wireTransferRequest?.startDate,
        endDate: wireTransferRequest?.endDate,
        operatorName: wireTransferRequest?.transactionOperatorName
      }
    }).then(response => {
      const wireTransfers = response.data as WireTransfer[];
      return wireTransfers;
    }).catch(error => {
      throw error;
    })
  }
}