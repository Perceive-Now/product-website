import React from "react";

const WireTransfer = () => {
  return (
    <div className="space-y-4 text-[16px] text-[#4F4F4F] mt-3">
      {/* Bank Details */}
      <div className="grid grid-cols-2 gap-y-1">
        <div className="text-[#A0A0A0]">Bank Name</div>
        <div>PN's Bank Name</div>

        <div className="text-[#A0A0A0]">Bank Address</div>
        <div>PN's Bank Address</div>

        <div className="text-[#A0A0A0]">Account Number</div>
        <div>PN's Account Number</div>

        <div className="text-[#A0A0A0]">Routing Number</div>
        <div>PN's Routing Number</div>

        <div className="text-[#A0A0A0]">SWIFT/BIC Code</div>
        <div>SWIFT/BIC Code</div>
      </div>
    </div>
  );
};

export default WireTransfer;
