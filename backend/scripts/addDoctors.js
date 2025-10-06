import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import doctorModel from "../models/doctorModel.js";

dotenv.config();

const doctors = [
  // ------------------- General physician -------------------
  {
    name: "Dr. Aswin Kumar",
    email: "aswin.kumar@example.com",
    password: "password123",
    speciality: "General physician",
    degree: "MBBS",
    experience: "10 years",
    about: "Experienced general physician providing comprehensive healthcare.",
    fees: 100,
    address: { street: "123 Main St", city: "Chennai", state: "Tamil Nadu", zip: "600001" }
  },
  {
    name: "Dr. Abhis Raj",
    email: "abhis.raj@example.com",
    password: "password123",
    speciality: "General physician",
    degree: "MBBS",
    experience: "12 years",
    about: "Dedicated general physician with expertise in preventive care.",
    fees: 110,
    address: { street: "456 Health Ave", city: "Madurai", state: "Tamil Nadu", zip: "625001" }
  },
  {
    name: "Dr. Visakan D",
    email: "visakan.d@example.com",
    password: "password123",
    speciality: "General physician",
    degree: "MD",
    experience: "8 years",
    about: "Compassionate general physician focusing on patient-centered care.",
    fees: 95,
    address: { street: "789 Care St", city: "Trichy", state: "Tamil Nadu", zip: "620001" }
  },
  {
    name: "Dr. Gowtham S",
    email: "gowtham.s@example.com",
    password: "password123",
    speciality: "General physician",
    degree: "MBBS",
    experience: "9 years",
    about: "General physician with strong diagnostic and preventive care skills.",
    fees: 105,
    address: { street: "111 Doctor Ln", city: "Coimbatore", state: "Tamil Nadu", zip: "641001" }
  },
  {
    name: "Dr. Lordson Rajesh",
    email: "lordson.rajesh@example.com",
    password: "password123",
    speciality: "General physician",
    degree: "MD",
    experience: "7 years",
    about: "General physician committed to patient wellness and education.",
    fees: 115,
    address: { street: "222 Clinic Rd", city: "Salem", state: "Tamil Nadu", zip: "636001" }
  },

  // ------------------- Gynecologist -------------------
  {
    name: "Dr. Janani Devi",
    email: "janani.devi@example.com",
    password: "password123",
    speciality: "Gynecologist",
    degree: "MD",
    experience: "8 years",
    about: "Specialist in women's health and gynecology.",
    fees: 150,
    address: { street: "456 Oak St", city: "Erode", state: "Tamil Nadu", zip: "638001" }
  },
  {
    name: "Dr. Pavithra N",
    email: "pavithra.n@example.com",
    password: "password123",
    speciality: "Gynecologist",
    degree: "MD",
    experience: "11 years",
    about: "Experienced gynecologist specializing in reproductive health.",
    fees: 160,
    address: { street: "789 Women's Way", city: "Vellore", state: "Tamil Nadu", zip: "632001" }
  },
  {
    name: "Dr. Keerthana S",
    email: "keerthana.s@example.com",
    password: "password123",
    speciality: "Gynecologist",
    degree: "MD",
    experience: "9 years",
    about: "Gynecologist focused on minimally invasive procedures.",
    fees: 155,
    address: { street: "321 Care Ln", city: "Thanjavur", state: "Tamil Nadu", zip: "613001" }
  },
  {
    name: "Dr. Lakshmi Priya",
    email: "lakshmi.priya@example.com",
    password: "password123",
    speciality: "Gynecologist",
    degree: "MD",
    experience: "10 years",
    about: "Gynecologist with expertise in maternal health.",
    fees: 165,
    address: { street: "222 Wellness St", city: "Nagercoil", state: "Tamil Nadu", zip: "629001" }
  },
  {
    name: "Dr. Anitha Mary",
    email: "anitha.mary@example.com",
    password: "password123",
    speciality: "Gynecologist",
    degree: "MD",
    experience: "7 years",
    about: "Caring gynecologist focused on preventive and reproductive health.",
    fees: 145,
    address: { street: "333 Motherhood Ave", city: "Dindigul", state: "Tamil Nadu", zip: "624001" }
  },

  // ------------------- Dermatologist -------------------
  {
    name: "Dr. Dinesh Kumar",
    email: "dinesh.kumar@example.com",
    password: "password123",
    speciality: "Dermatologist",
    degree: "MD",
    experience: "7 years",
    about: "Expert in skin care and dermatological treatments.",
    fees: 120,
    address: { street: "789 Pine St", city: "Karur", state: "Tamil Nadu", zip: "639001" }
  },
  {
    name: "Dr. Vignesh R",
    email: "vignesh.r@example.com",
    password: "password123",
    speciality: "Dermatologist",
    degree: "MD",
    experience: "10 years",
    about: "Dermatologist specializing in cosmetic dermatology.",
    fees: 135,
    address: { street: "456 Skin Care Blvd", city: "Tirunelveli", state: "Tamil Nadu", zip: "627001" }
  },
  {
    name: "Dr. Ramya L",
    email: "ramya.l@example.com",
    password: "password123",
    speciality: "Dermatologist",
    degree: "MD",
    experience: "8 years",
    about: "Pediatric dermatologist with expertise in children's skin conditions.",
    fees: 125,
    address: { street: "789 Epidermis Ave", city: "Virudhunagar", state: "Tamil Nadu", zip: "626001" }
  },
  {
    name: "Dr. Harish Kumar",
    email: "harish.kumar@example.com",
    password: "password123",
    speciality: "Dermatologist",
    degree: "MD",
    experience: "9 years",
    about: "Dermatologist with focus on allergy-related skin disorders.",
    fees: 140,
    address: { street: "333 Clear Skin Rd", city: "Cuddalore", state: "Tamil Nadu", zip: "607001" }
  },
  {
    name: "Dr. Sangeetha B",
    email: "sangeetha.b@example.com",
    password: "password123",
    speciality: "Dermatologist",
    degree: "MD",
    experience: "6 years",
    about: "Dermatologist with interest in acne and cosmetic procedures.",
    fees: 115,
    address: { street: "444 Glow Ave", city: "Thoothukudi", state: "Tamil Nadu", zip: "628001" }
  },

  // ------------------- Pediatricians -------------------
  {
    name: "Dr. Praveen Raj",
    email: "praveen.raj@example.com",
    password: "password123",
    speciality: "Pediatricians",
    degree: "MD",
    experience: "9 years",
    about: "Dedicated pediatrician caring for children's health.",
    fees: 110,
    address: { street: "321 Maple St", city: "Pudukkottai", state: "Tamil Nadu", zip: "622001" }
  },
  {
    name: "Dr. Aravind S",
    email: "aravind.s@example.com",
    password: "password123",
    speciality: "Pediatricians",
    degree: "MD",
    experience: "11 years",
    about: "Pediatrician with focus on newborn and adolescent care.",
    fees: 120,
    address: { street: "222 Kids Ln", city: "Kanchipuram", state: "Tamil Nadu", zip: "631501" }
  },
  {
    name: "Dr. Nivetha G",
    email: "nivetha.g@example.com",
    password: "password123",
    speciality: "Pediatricians",
    degree: "MD",
    experience: "8 years",
    about: "Compassionate pediatrician with child wellness focus.",
    fees: 115,
    address: { street: "333 Happy St", city: "Namakkal", state: "Tamil Nadu", zip: "637001" }
  },
  {
    name: "Dr. Rajesh Esakki",
    email: "rajesh.esakki@example.com",
    password: "password123",
    speciality: "Pediatricians",
    degree: "MD",
    experience: "10 years",
    about: "Specialist in child immunizations and preventive care.",
    fees: 125,
    address: { street: "444 Care Ave", city: "Theni", state: "Tamil Nadu", zip: "625531" }
  },
  {
    name: "Dr. Divya Sri",
    email: "divya.sri@example.com",
    password: "password123",
    speciality: "Pediatricians",
    degree: "MD",
    experience: "7 years",
    about: "Pediatrician with expertise in childhood nutrition.",
    fees: 105,
    address: { street: "555 Smile Rd", city: "Tiruvarur", state: "Tamil Nadu", zip: "610001" }
  },

  // ------------------- Neurologist -------------------
  {
    name: "Dr. Manoj Kumar",
    email: "manoj.kumar@example.com",
    password: "password123",
    speciality: "Neurologist",
    degree: "MD",
    experience: "12 years",
    about: "Neurologist specializing in nervous system disorders.",
    fees: 200,
    address: { street: "654 Cedar St", city: "Chennai", state: "Tamil Nadu", zip: "600002" }
  },
  {
    name: "Dr. Vishnu R",
    email: "vishnu.r@example.com",
    password: "password123",
    speciality: "Neurologist",
    degree: "MD",
    experience: "14 years",
    about: "Neurologist with focus on stroke and epilepsy care.",
    fees: 210,
    address: { street: "777 Brain Blvd", city: "Madurai", state: "Tamil Nadu", zip: "625002" }
  },
  {
    name: "Dr. Harini Devi",
    email: "harini.devi@example.com",
    password: "password123",
    speciality: "Neurologist",
    degree: "MD",
    experience: "10 years",
    about: "Neurologist experienced in treating migraines.",
    fees: 190,
    address: { street: "888 Nerve Ln", city: "Coimbatore", state: "Tamil Nadu", zip: "641002" }
  },
  {
    name: "Dr. Vinoth Raj",
    email: "vinoth.raj@example.com",
    password: "password123",
    speciality: "Neurologist",
    degree: "MD",
    experience: "9 years",
    about: "Specialist in neurodegenerative diseases.",
    fees: 195,
    address: { street: "999 Spinal Rd", city: "Tirunelveli", state: "Tamil Nadu", zip: "627002" }
  },
  {
    name: "Dr. Kavya Lakshmi",
    email: "kavya.lakshmi@example.com",
    password: "password123",
    speciality: "Neurologist",
    degree: "MD",
    experience: "11 years",
    about: "Neurologist with focus on multiple sclerosis.",
    fees: 205,
    address: { street: "111 Brain Care Ave", city: "Erode", state: "Tamil Nadu", zip: "638002" }
  },

  // ------------------- Gastroenterologist -------------------
  {
    name: "Dr. Esakki Muthu",
    email: "esakki.muthu@example.com",
    password: "password123",
    speciality: "Gastroenterologist",
    degree: "MD",
    experience: "8 years",
    about: "Gastroenterologist specializing in digestive system disorders.",
    fees: 170,
    address: { street: "111 Digestive Ave", city: "Madurai", state: "Tamil Nadu", zip: "625003" }
  },
  {
    name: "Dr. Vasanth Raj",
    email: "vasanth.raj@example.com",
    password: "password123",
    speciality: "Gastroenterologist",
    degree: "MD",
    experience: "10 years",
    about: "Expert in gastroenterology, focusing on liver and pancreas health.",
    fees: 180,
    address: { street: "222 Liver Ln", city: "Trichy", state: "Tamil Nadu", zip: "620002" }
  },
  {
    name: "Dr. Meenakshi R",
    email: "meenakshi.r@example.com",
    password: "password123",
    speciality: "Gastroenterologist",
    degree: "MD",
    experience: "12 years",
    about: "Providing advanced care for gastrointestinal issues.",
    fees: 190,
    address: { street: "333 GI Blvd", city: "Erode", state: "Tamil Nadu", zip: "638003" }
  },
  {
    name: "Dr. Karthik Bala",
    email: "karthik.bala@example.com",
    password: "password123",
    speciality: "Gastroenterologist",
    degree: "MD",
    experience: "9 years",
    about: "Specialist in colon and intestinal health.",
    fees: 175,
    address: { street: "444 Digest St", city: "Thanjavur", state: "Tamil Nadu", zip: "613002" }
  },
  {
    name: "Dr. Sneha Devi",
    email: "sneha.devi@example.com",
    password: "password123",
    speciality: "Gastroenterologist",
    degree: "MD",
    experience: "13 years",
    about: "Gastroenterologist with expertise in endoscopy and digestive cancers.",
    fees: 200,
    address: { street: "555 Stomach Ln", city: "Chennai", state: "Tamil Nadu", zip: "600003" }
  },
];

async function addDoctors() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await doctorModel.deleteMany({});
    console.log("🗑️ Old doctors cleared.");

    for (const doc of doctors) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(doc.password, salt);
      const doctorData = {
        ...doc,
        password: hashedPassword,
        image: "/assets/default-doctor.png",
        available: true,
        slots_booked: {},
        date: Date.now(),
      };
      const newDoctor = new doctorModel(doctorData);
      await newDoctor.save();
      console.log(`✅ Added doctor: ${doc.name}`);
    }

    console.log("🎉 All 30 Tamil doctors added successfully.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding doctors:", error);
    process.exit(1);
  }
}

addDoctors();
