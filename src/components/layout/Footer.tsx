import { useTranslation } from "react-i18next";
import styled from "styled-components";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <StyledFooter>
      <div className="pattern-bg" />
      <div className="footer-content">
        <p className="copyright">{t("footer.copyright")}</p>
        <p className="tagline">{t("footer.tagline")}</p>
      </div>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  position: relative;
  z-index: 10;
  min-height: 25vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .pattern-bg {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2284px%22%20height%3D%2254px%22%20viewBox%3D%22-10%20-10%2064%2034%22%3E%3Crect%20x%3D%2210%22%20y%3D%222%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2212%22%20y%3D%222%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2224%22%20y%3D%222%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2226%22%20y%3D%222%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2228%22%20y%3D%222%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2246%22%20y%3D%222%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%222%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%228%22%20y%3D%224%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%224%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2212%22%20y%3D%224%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2222%22%20y%3D%224%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2224%22%20y%3D%224%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2228%22%20y%3D%224%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2230%22%20y%3D%224%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2244%22%20y%3D%224%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2246%22%20y%3D%224%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%224%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%226%22%20y%3D%226%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%228%22%20y%3D%226%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%226%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2212%22%20y%3D%226%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2220%22%20y%3D%226%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2222%22%20y%3D%226%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2230%22%20y%3D%226%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2232%22%20y%3D%226%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2242%22%20y%3D%226%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2244%22%20y%3D%226%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2246%22%20y%3D%226%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%226%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%224%22%20y%3D%228%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%226%22%20y%3D%228%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%228%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2212%22%20y%3D%228%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2220%22%20y%3D%228%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2222%22%20y%3D%228%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2230%22%20y%3D%228%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2232%22%20y%3D%228%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2240%22%20y%3D%228%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2242%22%20y%3D%228%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2246%22%20y%3D%228%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%228%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%222%22%20y%3D%2210%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%224%22%20y%3D%2210%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%2210%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2212%22%20y%3D%2210%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2220%22%20y%3D%2210%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2222%22%20y%3D%2210%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2230%22%20y%3D%2210%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2232%22%20y%3D%2210%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2238%22%20y%3D%2210%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2240%22%20y%3D%2210%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2246%22%20y%3D%2210%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2210%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%222%22%20y%3D%2212%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%224%22%20y%3D%2212%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%2212%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2212%22%20y%3D%2212%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2220%22%20y%3D%2212%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2222%22%20y%3D%2212%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2230%22%20y%3D%2212%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2232%22%20y%3D%2212%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2238%22%20y%3D%2212%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2240%22%20y%3D%2212%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2246%22%20y%3D%2212%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2212%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%222%22%20y%3D%2214%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%224%22%20y%3D%2214%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%226%22%20y%3D%2214%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%228%22%20y%3D%2214%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%2214%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2212%22%20y%3D%2214%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2214%22%20y%3D%2214%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2220%22%20y%3D%2214%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2222%22%20y%3D%2214%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2230%22%20y%3D%2214%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2232%22%20y%3D%2214%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2238%22%20y%3D%2214%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2240%22%20y%3D%2214%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2242%22%20y%3D%2214%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2244%22%20y%3D%2214%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2246%22%20y%3D%2214%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2214%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2250%22%20y%3D%2214%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%2216%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2212%22%20y%3D%2216%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2220%22%20y%3D%2216%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2222%22%20y%3D%2216%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2230%22%20y%3D%2216%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2232%22%20y%3D%2216%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2246%22%20y%3D%2216%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2216%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%2218%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2212%22%20y%3D%2218%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2222%22%20y%3D%2218%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2224%22%20y%3D%2218%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2228%22%20y%3D%2218%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2230%22%20y%3D%2218%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2246%22%20y%3D%2218%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2218%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%228%22%20y%3D%2220%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%2220%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2212%22%20y%3D%2220%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2214%22%20y%3D%2220%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2224%22%20y%3D%2220%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2226%22%20y%3D%2220%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2228%22%20y%3D%2220%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2244%22%20y%3D%2220%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2246%22%20y%3D%2220%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2220%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3Crect%20x%3D%2250%22%20y%3D%2220%22%20width%3D%222%22%20height%3D%222%22%20fill%3D%22%23e8d5b7%22%20opacity%3D%220.33%22%2F%3E%3C%2Fsvg%3E"),
      conic-gradient(
        #0d0d15 0.25turn,
        #1a1a2e 0.25turn 0.5turn,
        #0d0d15 0.5turn 0.75turn,
        #0d0d15 0.75turn
      );
    background-color: #0d0d15;
    background-size: auto, 4px 4px;
    background-repeat: repeat;
    animation: footerMove 4s linear infinite;
  }

  .pattern-bg::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: linear-gradient(
      -62.5deg,
      #8b5cf6,
      #2d1b69,
      #1a3a5c,
      #4a2d8f,
      #2d1b69,
      #8b5cf6,
      #2d1b69,
      #1a3a5c,
      #4a2d8f,
      #2d1b69,
      #8b5cf6
    );
    mix-blend-mode: multiply;
    opacity: 0.7;
    background-size: 400%;
    background-position: 10%;
    animation: footerLight 5s infinite;
  }

  @keyframes footerMove {
    from {
      background-position: 0 0, 0;
    }
    to {
      background-position: calc(84px * 4) calc(54px * 2), 0;
    }
  }

  @keyframes footerLight {
    0% { background-position: 10%; }
    50% { background-position: 90%; }
    100% { background-position: 90%; }
  }

  .footer-content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 2rem;
  }

  .copyright {
    color: rgba(232, 213, 183, 0.7);
    font-size: 16px;
    letter-spacing: 0.1em;
    font-family: var(--font-display, sans-serif);
    margin-bottom: 8px;
  }

  .tagline {
    color: rgba(192, 192, 192, 0.5);
    font-size: 14px;
    letter-spacing: 0.2em;
  }
`;
