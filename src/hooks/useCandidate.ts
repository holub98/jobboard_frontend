import { enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { getOfferCadidates, getSingleCandidate } from "~/api";

export type ExperienceType = {
  companyName: string;
  job: string;
  dateFrom: string;
  dateTo: string;
};

export type EducationType = {
  schoolName: string;
  dateFrom: string;
  dateTo: string;
  faculty: string;
};
export type LanguagesType = {
  name: string;
  level: string;
};

export type CandidateType = {
  _id: string;
  offerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience?: ExperienceType[];
  education: EducationType[];
  languages: LanguagesType[];
  stack: string[];
  another: string;
};

export type Earnings = {
  from: string;
  to: string;
};

export type Offers = {
  _id: string;
  name: string;
  earnings: Earnings;
  workDirection: "Remote" | "PartlyRemote" | "Office";
  requirements: string[];
  description: string;
};

export type CompanyType = {
  _id: string;
  name: string;
  localization: LocalizationType;
};
export type LocalizationType = {
  country: string;
  city: string;
  street: string;
  number: string;
  zipCode: string;
};

export type CandidateFullInfoType = {
  candidate: CandidateType;
  offer: Offers;
  company: CompanyType;
};

export const useCandidate = (token: string) => {
  const myCandidates = (offerId: string) => {
    const [data, setData] = useState<CandidateType[]>();
    const fetchCandidates = useMemo(
      () => async () => {
        try {
          const response = await getOfferCadidates(offerId, token);
          setData(response.data);
        } catch (error) {
          enqueueSnackbar({ variant: "error", message: `${error}` });
        }
      },
      [data]
    );
    useEffect(() => {
      fetchCandidates();
    }, [fetchCandidates]);
    return data;
  };
  const singleCandidate = (offerId: string, candidateId: string, token: string) => {
    const [data, setData] = useState<CandidateFullInfoType>();
    const fetchCandidate = useMemo(
      () => async () => {
        try {
          const response = await getSingleCandidate(offerId, candidateId, token);
          setData(response.data);
        } catch (error) {
          enqueueSnackbar({ variant: "error", message: `${error}` });
        }
      },
      [data]
    );
    useEffect(() => {
      fetchCandidate();
    }, [fetchCandidate]);

    return data;
  };

  return { myCandidates, singleCandidate };
};
