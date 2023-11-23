"use client";

import {
  Form,
  FormAddress,
  FormControl,
  FormErrorMessage,
  FormInput,
} from "@/components/forms";
import { z } from "zod";
import { Address } from "@/graphql/types";
import { Divider } from "@/components/divider";
import { Text } from "@/components/typography/text";
import { H1 } from "@/components/typography/heading";

type LocationFormProps = {
  address: Address;
};

const locationSchema = z.object({
  address: z.object({
    line_1: z.string().min(1, "Line one is required"),
    line_2: z.string().min(1, "Line two is required"),
    town_or_city: z.string().min(1, "Town or city is required"),
    country: z.string().min(1, "Country is required"),
    postcode: z.string().min(1, "Postcode is required"),
  }),
});

export default function LocationPage() {
  return (
    <div className="mb-28">
      <div className="pb-8 space-y-2">
        <H1>Where is your listing located?</H1>
        <Text className="font-normal">
          Only guests that have reservations will receive the exact location of
          your listing.
        </Text>
      </div>

      <div>
        <Form<LocationFormProps, typeof locationSchema>
          validationSchema={locationSchema}
          onSubmit={(data) => console.log(data)}
          defaultValues={{
            address: {
              line_1: "",
              line_2: "",
              town_or_city: "",
              country: "",
              postcode: "",
            },
          }}
        >
          {({ setValue, formState: { errors } }) => (
            <>
              <FormAddress
                placeHolder="Search by postcode"
                className="mb-4"
                onChange={(address: Address) => setValue("address", address)}
              />

              <Divider />

              <FormControl>
                <FormInput
                  name="address.line_1"
                  placeholder="Line 1"
                  isError={!!errors?.address?.line_1?.message}
                />
                <FormErrorMessage>
                  {errors?.address?.line_1?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormInput
                  name="address.line_2"
                  placeholder="Line 2"
                  isError={!!errors?.address?.line_2?.message}
                />
                <FormErrorMessage>
                  {errors?.address?.line_2?.message}
                </FormErrorMessage>
              </FormControl>

              <div className="grid grid-cols-2 gap-4">
                <FormControl>
                  <FormInput
                    name="address.town_or_city"
                    placeholder="Town or city"
                    isError={!!errors?.address?.town_or_city?.message}
                  />
                  <FormErrorMessage>
                    {errors?.address?.town_or_city?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormInput
                    name="address.country"
                    placeholder="Country"
                    isError={!!errors?.address?.country?.message}
                  />
                  <FormErrorMessage>
                    {errors?.address?.country?.message}
                  </FormErrorMessage>
                </FormControl>
              </div>

              <FormControl>
                <FormInput
                  name="address.postcode"
                  placeholder="Postcode"
                  isError={!!errors?.address?.postcode?.message}
                />
                <FormErrorMessage>
                  {errors?.address?.postcode?.message}
                </FormErrorMessage>
              </FormControl>

              <NewListingFooter />
            </>
          )}
        </Form>
      </div>
    </div>
  );
}
