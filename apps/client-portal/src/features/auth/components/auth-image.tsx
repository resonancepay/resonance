import { Container, Text } from "@resonance/ui";
import { Col, Row } from "antd";
import { AuthTabs } from "./auth-tabs";

export const AuthImage = () => {
  return (
    <Container
      as="section"
      className="relative w-full h-screen bg-[url('/assets/images/auth-image.png')] bg-cover bg-no-repeat bg-center px-16 flex items-end justify-center pb-30"
    >
      <Container>
        <Row justify={"center"}>
          <Col xs={24} md={20}>
            <Text variant="h2" className="text-inverted">
              Book trusted, high-quality cleaning for your home and <br />{" "}
              business — on your schedule.
            </Text>
            <Container className="mt-5 flex gap-4 flex-wrap">
              <AuthTabs
                path="/assets/images/Flag United Kingdom.png"
                textValue="Vetted Cleaners"
              />
              <AuthTabs
                path="/assets/images/Man Office Worker Medium Light Skin Tone.png"
                textValue="Flexible Booking"
              />
              <AuthTabs
                path="/assets/images/Rocket.png"
                textValue="Fast Support"
              />
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
