import { useTranslation } from "react-i18next";
const LanguageSelector = () => {
    const { i18n } = useTranslation();
  
    return (
      <select onChange={(e) => i18n.changeLanguage(e.target.value)} value={i18n.language}>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="de">Deutsch</option>
      </select>
    );
  };

export default LanguageSelector;