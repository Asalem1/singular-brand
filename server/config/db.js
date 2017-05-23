const chalk     = require('chalk');
const config    = require('../config');
const Sequelize = require('sequelize');
const db        = new Sequelize(config.db.database, config.db.user, config.db.password, { host: config.db.host, dialect: config.db.dialect, logging: config.log.debug });

var Skill = db.define('Skill', {
  name: Sequelize.STRING,
  expertise: Sequelize.BOOLEAN
});

var Category = db.define('Category', {
  name: {type: Sequelize.STRING, unique: true}
});

var Education = db.define('Education', {
  school: Sequelize.STRING,
  degreeOrProgram: Sequelize.STRING,
  major: Sequelize.STRING,
  minor: Sequelize.STRING,
  dateCompleted: Sequelize.DATE
});

var Job = db.define('Job', {
  employer: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  jobTitle: Sequelize.STRING,
  startDate: Sequelize.DATE,
  endDate: Sequelize.DATE,
  logoImage: Sequelize.STRING
});

var Project = db.define('Project', {
  title: Sequelize.STRING,
  role: Sequelize.STRING,
  url: Sequelize.STRING,
  highlights: Sequelize.ARRAY(Sequelize.TEXT)
});

var ProjectType = db.define('ProjectType', {
  name: Sequelize.STRING
});

var CommunityServiceProject = db.define('CommunityServiceProject', {
  organization: Sequelize.STRING,
  role: Sequelize.STRING
});

var SocialMediaAccount = db.define('SocialMediaAccount', {
  siteName: Sequelize.STRING,
  username: Sequelize.STRING,
  profileUrl: Sequelize.STRING
});

var Portfolio = db.define('Portfolio', {
  image: Sequelize.STRING,
  url: Sequelize.STRING
});

var Blog = db.define('Blog', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT,
  published: Sequelize.BOOLEAN,
  datePublished: Sequelize.DATE,
  mediumUrl: Sequelize.STRING
});

var BlogCategory = db.define('BlogCategory', {
  BlogId: Sequelize.INTEGER,
  CategoryId: Sequelize.INTEGER
});

var User = db.define('User', {
  firstName: Sequelize.STRING,
  middleName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  address1: Sequelize.STRING,
  address2: Sequelize.STRING,
  city: Sequelize.STRING,
  stateProvince: Sequelize.STRING,
  country: Sequelize.STRING,
  postalCode: Sequelize.STRING,
  location: Sequelize.STRING,
  phone: Sequelize.STRING,
  email: Sequelize.STRING,
  photoUrl: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

var Setting = db.define('Setting', {
  hideEmail: Sequelize.BOOLEAN,
  hidePhone: Sequelize.BOOLEAN,
  hideAddress: Sequelize.BOOLEAN,
  hideLocation: Sequelize.BOOLEAN,
  enableContactForm: Sequelize.BOOLEAN,
  enableResumeModule: Sequelize.BOOLEAN,
  enablePortfolioModule: Sequelize.BOOLEAN,
  enableBlogModule: Sequelize.BOOLEAN,
  enableSignup: Sequelize.BOOLEAN
});

Category.belongsToMany(Blog, {through: BlogCategory, onDelete: 'CASCADE'});
Skill.hasOne(Category);
User.hasMany(Skill);
User.hasMany(Education);
User.hasMany(Job);
User.hasMany(Project);
User.hasMany(CommunityServiceProject);
User.hasMany(SocialMediaAccount);
User.hasMany(Portfolio);
User.hasMany(Blog);
Project.hasOne(ProjectType);

db.sync({force: config.db.sync}).then(function () {
  if (config.log.info) {
    console.log(chalk.green('Initialized the ' + config.env + ' database: ' +
      config.db.database));
  }
  return null;
}).catch(function (error) {
  console.error(chalk.red(error.message));
});

module.exports = {
  db: db,
  Sequelize: Sequelize,
  User: User,
  Category: Category,
  Skill: Skill,
  Education: Education,
  Job: Job,
  Project: Project,
  ProjectType: ProjectType,
  CommunityServiceProject: CommunityServiceProject,
  SocialMediaAccount: SocialMediaAccount,
  Portfolio: Portfolio,
  Blog: Blog,
  BlogCategory: BlogCategory,
  Setting: Setting
};