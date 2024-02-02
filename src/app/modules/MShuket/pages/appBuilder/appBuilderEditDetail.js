
import { AP00000001, AP00000002BLOG, AP00000002EVENT, AP00000007, AP00000008, AP00000010, AP00000015 } from './index'

export const AppBuilderEditDetail = ({ detail: dt }) => {

  return (
   dt?.tmpl_code === "AP00000001" ?(
     <AP00000001 dt={dt}></AP00000001>
   ): dt?.tmpl_code === "AP00000002" && dt?.tmpl_template_type === 'EV' ?(
    <AP00000002EVENT dt={dt}></AP00000002EVENT>
  ): dt?.tmpl_code === "AP00000002" && dt?.tmpl_template_type === 'BG' ?(
    <AP00000002BLOG dt={dt}></AP00000002BLOG>
  ):dt?.tmpl_code === "AP00000010" ?(
    <AP00000010 dt={dt}></AP00000010>
  ):dt?.tmpl_code === "AP00000007" ?(
    <AP00000007 dt={dt}></AP00000007>
  ): dt?.tmpl_code === "AP00000008" ? (
    <AP00000008 dt={dt}></AP00000008>
  )  : dt?.tmpl_code === "AP00000013" ?(
    <img style={{width:"100%", marginTop:20}} src="http://dev.moaplatform.co.kr/moa_back_client/img/app_template/AP00000013.jpg" alt=""  />
  ): dt?.tmpl_code === "AP00000014" ?(
    <img style={{width:"100%", marginTop:20}} src="http://dev.moaplatform.co.kr/moa_back_client/img/app_template/AP00000014.jpg" alt=""  />
  ):dt?.tmpl_code === "AP00000015" ?(
    <AP00000015 dt={dt}></AP00000015>
  ): null
    
  );
};
