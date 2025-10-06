import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

// ============================
// Doctor Login
// ============================
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await doctorModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ============================
// Add Doctor (with default image)
// ============================
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;

        // required fields check
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // email validation
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // password validation
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // password hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // default doctor image (from /public/assets folder)
        let imageUrl = "/assets/default-doctor.png";

        // prepare doctor data
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            available: true,
            date: Date.now(),
            image: imageUrl
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({ success: true, message: "Doctor Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ============================
// Get Doctor Appointments
// ============================
const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.body;
        const appointments = await appointmentModel.find({ docId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ============================
// Cancel Appointment
// ============================
const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
            return res.json({ success: true, message: "Appointment Cancelled" });
        }

        res.json({ success: false, message: "Invalid request" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ============================
// Complete Appointment
// ============================
const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
            return res.json({ success: true, message: "Appointment Completed" });
        }

        res.json({ success: false, message: "Invalid request" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ============================
// Doctors List (Frontend)
// ============================
const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(["-password", "-email"]);
        res.json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ============================
// Change Doctor Availability
// ============================
const changeAvailablity = async (req, res) => {
    try {
        const { docId } = req.body;

        const docData = await doctorModel.findById(docId);
        const updated = await doctorModel.findByIdAndUpdate(
            docId,
            { available: !docData.available },
            { new: true }
        );

        res.json({ success: true, message: "Availability Changed", available: updated.available });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ============================
// Doctor Profile
// ============================
const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.body;
        const profileData = await doctorModel.findById(docId).select("-password");
        res.json({ success: true, profileData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ============================
// Update Doctor Profile
// ============================
const updateDoctorProfile = async (req, res) => {
    try {
        const { docId, fees, address, available } = req.body;

        const updateFields = {};
        if (fees) updateFields.fees = fees;
        if (address) updateFields.address = address;
        if (available !== undefined) updateFields.available = available;

        await doctorModel.findByIdAndUpdate(docId, updateFields);
        res.json({ success: true, message: "Profile Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ============================
// Doctor Dashboard
// ============================
const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.body;
        const appointments = await appointmentModel.find({ docId });

        let earnings = 0;
        appointments.forEach((item) => {
            if (item.isCompleted && item.payment) {
                earnings += item.amount;
            }
        });

        let patients = [];
        appointments.forEach((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId);
            }
        });

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: [...appointments].reverse(),
        };

        res.json({ success: true, dashData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    loginDoctor,
    addDoctor,
    appointmentsDoctor,
    appointmentCancel,
    appointmentComplete,
    doctorList,
    changeAvailablity,
    doctorDashboard,
    doctorProfile,
    updateDoctorProfile
};
