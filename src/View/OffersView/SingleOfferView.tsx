import { ArrowBack, Business, Home, HomeWork } from "@mui/icons-material";
import { Button, Chip, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useOffers } from "~/hooks/useOffers";

export const SingleOfferView = () => {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const { singleOffer } = useOffers();
  if (singleOffer === undefined || offerId === undefined) {
    return null;
  }
  const data = singleOffer(offerId);
  if (data === undefined) {
    return null;
  }
  console.log(data);

  return (
    <Stack height="100%">
      <Stack justifyContent="space-between" direction="row" marginBottom={1}>
        <IconButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBack />
        </IconButton>
        <Button>Apply</Button>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        padding="8px 16px"
        boxShadow="3px 4px 9px -2px rgba(120, 120, 125, 1);"
        borderRadius="10px"
        marginBottom={2}
      >
        <Typography variant="h5">{data.offer.name}</Typography>
        <Typography variant="h6">
          {data.offer.earnings.from}-{data.offer.earnings.to} PLN
        </Typography>
      </Stack>
      <Stack
        padding="8px 16px"
        boxShadow="3px 4px 9px -2px rgba(120, 120, 125, 1);"
        borderRadius="10px"
        marginBottom={2}
      >
        <Typography variant="h5">{data.company.name}</Typography>
        <Stack direction="row" alignItems="center" gap="4px">
          <Typography variant="h6" fontWeight="bold">
            Address:
          </Typography>
          <Stack direction="row" gap="4px">
            <Typography variant="h6">
              {data.company.localization.street}{" "}
            </Typography>
            <Typography variant="h6">
              {data.company.localization.number},
            </Typography>
            <Typography variant="h6">
              {data.company.localization.zipCode}
            </Typography>
            <Typography variant="h6">
              {data.company.localization.city},
            </Typography>
            <Typography variant="h6">
              {data.company.localization.country}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        padding="8px 16px"
        boxShadow="3px 4px 9px -2px rgba(120, 120, 125, 1);"
        borderRadius="10px"
        marginBottom={2}
      >
        <Typography variant="h5">Tech:</Typography>
        <Stack gap="4px" direction="row">
          {data.offer.requirements.map((it) => (
            <Chip label={it} />
          ))}
        </Stack>
      </Stack>
      <Stack
        padding="8px 16px"
        boxShadow="3px 4px 9px -2px rgba(120, 120, 125, 1);"
        borderRadius="10px"
        marginBottom={2}
        flexGrow={1}
      >
        {data.offer.workDirection === "Office" && (
          <Stack direction="row" alignItems="center" gap="2px">
            <Business />
            <Typography variant="h6">Office</Typography>
          </Stack>
        )}
        {data.offer.workDirection === "PartlyRemote" && (
          <Stack direction="row" alignItems="center" gap="2px">
            <HomeWork />
            <Typography variant="h6"> Hybrid</Typography>
          </Stack>
        )}
        {data.offer.workDirection === "Remote" && (
          <Stack direction="row" alignItems="center" gap="2px">
            <Home />
            <Typography variant="h6">Remote</Typography>
          </Stack>
        )}
        <div dangerouslySetInnerHTML={{ __html: data.offer.description }} />
      </Stack>
    </Stack>
  );
};
