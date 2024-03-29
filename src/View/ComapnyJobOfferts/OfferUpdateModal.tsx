import { Edit } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { OfferType, offerSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { OfferForm } from "./OfferForm";
import { updateOffer } from "~/api/companyOffer";

type Props = {
  initialData: OfferType;
  offerId: string;
  token: string
};

export const OfferUpdateModal = ({ initialData, offerId, token }: Props) => {
  const form = useForm<OfferType>({
    defaultValues: initialData,
    resolver: zodResolver(offerSchema),
  });
  const { reset } = form;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onSubmit = async (data: OfferType) => {
    updateOffer(data, offerId, token);
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
        <DialogTitle>Update offer</DialogTitle>
        <DialogContent>
          <OfferForm
            formContext={form}
            onSubmit={onSubmit}
            initialValue={initialData}
          />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" variant="contained" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="offer-form">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
