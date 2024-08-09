// 'use strict';
// const {
//   Model
// } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   const Project = sequelize.define('Project', {
//     projectName: DataTypes.STRING,
//     startDate: DataTypes.DATE,
//     endDate: DataTypes.DATE,
//     description: DataTypes.TEXT,
//     technologies: DataTypes.TEXT,
//     image: DataTypes.STRING,
//     postAt: DataTypes.DATE // Add this line
//   }, {});

//   return Project;
// };

'use strict';
/** @type {import('sequelize').Model} */
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    projectName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    technologies: {
      type: DataTypes.JSON, // Use JSON to store arrays or objects
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    },
    postAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW // Default to the current date
    }
  }, {});

  Project.associate = function (models) {
    // associations can be defined here
  };

  return Project;
};