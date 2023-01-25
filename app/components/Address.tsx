import cx from "classnames";
import { z } from "zod";
import { AddressSchema } from "~/yext/schemas";

type Props = {
  //Insert Props Here
  className?: string;
  address: z.infer<typeof AddressSchema>;
};

const Address = ({ className, address }: Props) => {
  return (
    <div className={cx(className)}>
      <div>{address.line1}</div>
      <div>{address.line2}</div>
      <div>
        {address.city}, {address.region} {address.postalCode}
      </div>
    </div>
  );
};

export default Address;
