// 网络请求地址
const url = "http://www.hunruyi.com/index.php/Admin/";

const uapi = {
  login: url + "Index/Login", //登录
  lunbo: url + "api/bannerlist", //轮播查询
  modifylunbo: url + "api/update_banner", //修改轮播
  newlunbo: url + "api/banner_add", //新建轮播
  delelunbo: url + "api/delete_banner", //删除轮播
  bottomcont: url + "api/module_edit", //首页按钮内容修改
  obtainbotcont: url + "api/modulelist", //首页按钮内容修改
  article: url + "Tb/wedding", //文章新增
  articlelib: url + "Tb/Article", //文章列表获取
  deleteintro: url + "Tb/delete_intro", //文章列表删除
  articleedit: url + "Tb/article_edit", //文章修改
  informadd: url + "Main/informadd", //新建站内信
  inform: url + "Main/inform", //站内信列表获取
  informdel: url + "Main/informdel", //站内信历史删除
  contact: url + "Index/contactelist", //推广图获取接口
  contactedit: url + "Index/contactedit", //推广图修改
  userxx: url + "Index/user_xx", //管理员列表
  userdel: url + "Index/user_del", //管理员删除
  adminadd: url + "Index/admin_add", //管理员添加
  index: url + "Index/index", //管理员修改其他管理员
  changepw: url + "Index/changepw", //管理员修改自己
  checkin: url + "Index/checkin", //结婚登记列表
  checkinadd: url + "Index/checkinadd", //结婚登记新增
  checkindel: url + "Index/checkindel", //结婚登记删除
  menberedit: "http://www.hunruyi.com/index.php/Home/Api/user", //修改用户资料接口
  memberlist: url + "User/memberlist", //会员中心会员列表
  deluer: url + "Index/deluer", //删除会员
  vmenber: url + "User/vmenber" //vip会员中心会员列表
};

export default uapi;
