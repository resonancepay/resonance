import { Container } from "@resonance/ui";
import Image from "next/image";

export const DocTypeWrapper = () => {
  return (
    <Container className="h-19 w-19 rounded-xl bg-brand-bg-light flex items-center justify-center">
      <Image
        width={32}
        height={32}
        src={"/assets/images/doc-type.png"}
        alt="Doc Type"
      />
    </Container>
  );
};
