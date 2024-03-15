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
import { LocalizationForm } from "./Form/LocalizationForm";
type Props = {
  initialData: CompanyFullType;
};

export const LocalizationUpdateModal = ({ initialData }: Props) => {
  const form = useForm<CompanyType>({
    defaultValues: initialData,
    resolver: zodResolver(companySchema),
  });
  const { reset, handleSubmit } = form;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit = async (data: CompanyType) => {
    updateCompany(data);
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
        <DialogTitle>Update company localization</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            id="info-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <LocalizationForm formContext={form} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" size="large" onClick={onClose}>
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
