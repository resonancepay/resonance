import { Container, Text } from "@resonance/ui";
import { Col, Row } from "antd";
import { AuthTabs } from "./auth-tabs";

export const AuthImage = () => {
  return (
    <Container
      as="section"
      className="relative w-full h-screen bg-[url('/assets/images/client-auth-image.jpg')] bg-cover bg-no-repeat bg-center px-16 flex items-end justify-center pb-30"
    >
      <Container className="absolute inset-0 bg-gradient-to-b from-[#121212] to-brand-secondary-bg-bold opacity-80" />
      <Container className="relative">
        <Row justify={"center"}>
          <Col xs={24} md={20}>
            <Text variant="h2" className="text-inverted">
              Helping you stay informed with transparent, high-quality
              cleaning services every step of the way.
            </Text>
            <Container className="mt-5 flex gap-4 flex-wrap">
              <AuthTabs
                path="/assets/images/Flag United Kingdom.png"
                textValue="Trusted Network"
              />
              <AuthTabs
                path="/assets/images/Man Office Worker Medium Light Skin Tone.png"
                textValue="Quality Cleaners"
              />
              <AuthTabs
                path="/assets/images/Rocket.png"
                textValue="Simple Onboarding"
              />
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
