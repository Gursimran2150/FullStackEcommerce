import Helmet from "react-helmet";

// eslint-disable-next-line react/prop-types
const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default MetaData;
