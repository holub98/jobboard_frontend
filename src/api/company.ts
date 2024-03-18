import { enqueueSnackbar } from "notistack";
import { api } from "./api";

type LocalizationType = {
  country: string;
  city: string;
  street: string;
  number: string;
  zipCode: string;
};

export type CompanyFullType = {
  email: string;
  password: string;
  name: string;
  localization: LocalizationType;
  description: string;
};

export const registerCompany = async (data: CompanyFullType) => {
  try {
    await api.post("/company/register", data);
    enqueueSnackbar({ variant: "success", message: "Register success" });
  } catch (err) {
    enqueueSnackbar({ variant: "error", message: `${err}` });
  }
};

export const getMyCompany = () => api.get("/company/my-company");

export const getAllCompanies = () => api.get("/company/");

export const getSingleCompany = (companyId: string) =>
  api.get(`/company/${companyId}`);

export const updateCompany = (data: CompanyFullType) => {
  try {
    api.put("/company/update-me", data);
    enqueueSnackbar({ variant: "success", message: "Account updated" });
  } catch (err) {
    enqueueSnackbar({ variant: "error", message: `${err}` });
  }
};

export const deleteAccount = () => {
  try {
    api.delete("/company/delete-account");
    enqueueSnackbar({ variant: "success", message: "Account deleted" });
  } catch (err) {
    enqueueSnackbar({ variant: "error", message: `${err}` });
  }
};
