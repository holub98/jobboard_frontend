import { CompanyType, companySchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { CompanyFullType, updateCompany } from "~/api";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { InfoForm } from "./Form/InfoForm";
type Props = {
  initialData: CompanyFullType;
  token: string
};

export const InfoUpdateModal = ({ initialData, token }: Props) => {
  const form = useForm<CompanyType>({
    defaultValues: initialData,
    resolver: zodResolver(companySchema),
  });
  const { reset, handleSubmit } = form;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit = (data: CompanyType) => {
    updateCompany(data, token);
    setIsOpen(false);
    reset();
  };
  const onClose = () => {
    setIsOpen(false);
    reset();
  };
  return (
    <>
      <IconButton onClick={() => setIsOpen(true)}>
        <Edit />
      </IconButton>
      <Dialog open={isOpen}>
        <DialogTitle>Update company info</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            id="info-form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ padding: "16px 0px" }}
          >
            <InfoForm formContext={form} register={false} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="info-form">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
