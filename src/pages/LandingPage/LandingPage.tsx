import { Typography } from "antd"
import { animateScroll as scroll } from "react-scroll"
import styled from "styled-components"

import theme from "../../shared/utils/theme"
import { Button } from "../../shared/components"
import { useNavigate } from "react-router-dom"
import { HowToBook, ForTherapists, ForPatients } from "./components"
// import { LazyLoadImage } from "react-lazy-load-image-component";

function LandingPage() {
  const navigate = useNavigate()

  const routeToLoginPage = () => navigate("/login")

  return (
    <>
      <Container>
        <Info>
          <CenterWrap>
            <Typography.Title level={1} style={{ fontSize: 50 }}>
              Make your <br />
              mental health
              <br />
              top priority
            </Typography.Title>
            <Typography.Title
              mark
              level={3}
              type="secondary"
              style={{ marginBottom: 30, width: "60%" }}
            >
              Consult experienced therapists from your home at ease.
            </Typography.Title>
            <ButtonGroup>
              <Button
                name="Learn More"
                onClick={() => scroll.scrollTo(800)}
                width={45}
                height={30}
              />
              <Button
                name="Join Now"
                onClick={routeToLoginPage}
                width={45}
                height={30}
              />
            </ButtonGroup>
          </CenterWrap>
        </Info>
        <Hero src={require("../../shared/assets/Home-Hero.png")} loading = "lazy"  alt="Hero image" />
      </Container>
      <HowToBook />
      <ForTherapists />
      <ForPatients />
    </>
  )
}

export default LandingPage

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 83px 100px 83px 150px;
  background-color: ${theme.primary};

  @media (max-width: 450px) {
    flex-direction: column-reverse;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }

  @media (max-width: 768px) {
    padding: 20px 50px;
  }
`

const CenterWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 90%;

  @media (max-width: 450px) {
    width: 100%;
  }
`

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;

  @media (max-width: 450px) {
    width: 80%;
    text-align: center;
  }

  @media (max-width: 768px) {
    width: 50%;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 55%;

  @media (max-width: 450px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`

const Hero = styled.img`
  width: 50%;

  @media (max-width: 451px) {
    width: 100%;
  }
`
