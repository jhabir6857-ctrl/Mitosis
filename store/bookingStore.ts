import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BookingState {
  // Non-sensitive — persisted to localStorage
  selectedDepartmentId: string | null;
  selectedDepartmentName: string | null;
  selectedDoctorId: string | null;
  selectedDoctorName: string | null;
  selectedDate: string | null;
  selectedSlotId: string | null;
  selectedSlotTime: string | null;
  currentStep: number;

  // Sensitive — NEVER persisted (in-memory only)
  patientName: string;
  patientPhone: string;
  patientNotes: string;

  // Actions
  setDepartment: (id: string, name: string) => void;
  setDoctor: (id: string, name: string) => void;
  setDate: (date: string) => void;
  setSlot: (slotId: string, time: string) => void;
  setStep: (step: number) => void;
  setPatientField: (field: "patientName" | "patientPhone" | "patientNotes", value: string) => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      // Persisted non-sensitive workflow state
      selectedDepartmentId: null,
      selectedDepartmentName: null,
      selectedDoctorId: null,
      selectedDoctorName: null,
      selectedDate: null,
      selectedSlotId: null,
      selectedSlotTime: null,
      currentStep: 1,

      // In-memory ONLY — not persisted (privacy-safe)
      patientName: "",
      patientPhone: "",
      patientNotes: "",

      setDepartment: (id, name) => set({ selectedDepartmentId: id, selectedDepartmentName: name, selectedDoctorId: null, selectedDoctorName: null, selectedDate: null, selectedSlotId: null, selectedSlotTime: null }),
      setDoctor: (id, name) => set({ selectedDoctorId: id, selectedDoctorName: name, selectedDate: null, selectedSlotId: null, selectedSlotTime: null }),
      setDate: (date) => set({ selectedDate: date, selectedSlotId: null, selectedSlotTime: null }),
      setSlot: (slotId, time) => set({ selectedSlotId: slotId, selectedSlotTime: time }),
      setStep: (step) => set({ currentStep: step }),
      setPatientField: (field, value) => set({ [field]: value }),
      resetBooking: () => set({
        selectedDepartmentId: null, selectedDepartmentName: null,
        selectedDoctorId: null, selectedDoctorName: null,
        selectedDate: null, selectedSlotId: null, selectedSlotTime: null,
        currentStep: 1, patientName: "", patientPhone: "", patientNotes: "",
      }),
    }),
    {
      name: "mitosis-booking-draft",
      // Privacy-Safe: Only persist the non-sensitive workflow fields
      partialize: (state) => ({
        selectedDepartmentId: state.selectedDepartmentId,
        selectedDepartmentName: state.selectedDepartmentName,
        selectedDoctorId: state.selectedDoctorId,
        selectedDoctorName: state.selectedDoctorName,
        selectedDate: state.selectedDate,
        selectedSlotId: state.selectedSlotId,
        selectedSlotTime: state.selectedSlotTime,
        currentStep: state.currentStep,
        // patientName, patientPhone, patientNotes are intentionally excluded
      }),
    }
  )
);
