import counterModel from "../Models/billCounter.model.js";

const generateBillNumber = async () => {
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear().toString().slice(-2); 
        const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0"); 
        const currentDay = String(currentDate.getDate()).padStart(2, "0"); 
        const currentDateKey = `${currentYear}${currentMonth}${currentDay}`; 
       
        const billCounter = await counterModel.findOneAndUpdate(
            { name: "Customer Invoice", dateKey: currentDateKey }, 
            { $inc: { seq: 1 } },  
            { new: true, upsert: true, setDefaultsOnInsert: true } 
        );

        const sequenceNumber = String(billCounter.seq).padStart(4, "0");

        const billNumber = `C${currentYear}${currentMonth}${currentDay}${sequenceNumber}`;

        return billNumber;
    } catch (error) {
        throw new Error("Failed to generate bill number");
    }
};

export default generateBillNumber;
