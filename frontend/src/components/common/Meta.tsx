import { Helmet } from 'react-helmet';

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const Meta = ({ title, description, keywords }: MetaProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'به مبل ایران خوش آمدید',
  description:
    'ما بهترین و با کیفیت ترین لوازم خانگی ایرانی را با مناسب ترین قیمت ارائه می دهیم',
  keywords:
    'لوازم خانگی, خرید لوازم خانگی, خرید مبل, مبلمان خانه, خرید میز و صندلی',
};

export default Meta;
