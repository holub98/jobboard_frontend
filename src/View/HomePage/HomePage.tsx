import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
  ToggleButton,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { FilterType, filterSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { tech } from "~/state/technologies";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { getAllOffers } from "~/api";

type OfferFilterType = {
  name?: string;
  requirements?: string;
  workDirection?: string;
  localization?: string;
};

export const HomePage = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const { control, register, handleSubmit, setValue } = useForm<FilterType>({
    resolver: zodResolver(filterSchema),
  });
  const [check, setCheck] = useState<boolean>(false);

  const onSubmit = async (data: FilterType) => {
    let body: OfferFilterType = {};
    if (data.requirements) {
      body.requirements = data.requirements.join("_");
      searchParams.set("technologies", body.requirements);
    }
    if (data.localization) {
      body.localization = data.localization;
      searchParams.set("localization", body.localization);
    }
    if (data.name) {
      body.name = data.name;
      searchParams.set("offer", body.name);
    }
    if (data.workDirection) {
      body.workDirection = data.workDirection;
      searchParams.set("remote", "yes");
    }

    getAllOffers(body);
    if (Object.keys(body).length === 0) {
      navigate("/offers");
    } else {
      navigate(`/offers/search?${searchParams}`);
    }
    console.log(data);
  };
  const checkToggle = (check: boolean) => {
    if (check) {
      setCheck(false), setValue("workDirection", undefined);
    } else {
      setCheck(true);
      setValue("workDirection", "remote");
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxShadow: "0px 0px 010px 0px #D2D2E0",
        padding: "48px 24px 48px 24px",
        justifyContent: "center",
        alignItem: "center",
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h5">Find your dream work</Typography>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"} gap="8px">
          <TextField
            label="Job title, keyword"
            {...register("name")}
            sx={{ width: "400px" }}
          />
          <FormControl>
            <Controller
              name="requirements"
              control={control}
              defaultValue={undefined}
              render={({ field }) => (
                <Autocomplete
                  onChange={(_, newValue) => {
                    if (newValue !== null) field.onChange(newValue);
                  }}
                  onBlur={field.onBlur}
                  multiple
                  filterSelectedOptions
                  options={tech}
                  value={field.value || undefined}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tech"
                      placeholder="Tech"
                      sx={{ width: "400px" }}
                    />
                  )}
                />
              )}
            />
          </FormControl>

          <FormControl>
            <Controller
              name="workDirection"
              control={control}
              render={() => (
                <ToggleButton
                  value="remote"
                  selected={check}
                  onChange={() => checkToggle(check)}
                  sx={{
                    height: "56px",
                  }}
                >
                  Remote
                </ToggleButton>
              )}
            />
          </FormControl>

          <TextField label="Localization" {...register("localization")} />
        </Stack>
        <Button sx={{ height: "56px" }} type="submit">
          Search
        </Button>
      </Stack>
    </Box>
  );
};