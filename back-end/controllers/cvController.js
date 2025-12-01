const { ObjectId } = require("mongodb");
const User = require("../models/user");
const Cv = require("../models/cv");
const Education = require("../models/education");
const Experience = require("../models/experience");
const Certification = require("../models/certification");
const Skill = require("../models/skill");
const Project = require("../models/project");
const Language = require("../models/language");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const { IMAGE_PATH } = require("../config/config");

module.exports.addEducation = async function (req, res, next) {
      try{
        const edu = new Education ({
          establishment : req.body.establishment,
          section : req.body.section,
          diploma : req.body.diploma,
          year_start : req.body.year_start,
          year_end : req.body.year_end,
          present: req.body.present || false,
          cv : req.body.cv
        })
      const e= await edu.save()
      res.status(200).json(e);
    }
      catch(err) {
        res.status(500).json(err)
      }
};
module.exports.addExperience = async function (req, res, next) {
      try{
        const exp = new Experience({
          company : req.body.company,
          job : req.body.job,
          start : req.body.start,
          end : req.body.end,
          present: req.body.present || false,
          task_description : req.body.task_description,
          cv : req.body.cv
        })
      
      const e= await exp.save()
      res.status(200).json(e);
    }
      catch(err) {
        res.status(500).json(err)
      }
};
module.exports.addCertif = async function (req, res, next) {
  // const body = { ...req.body };
  if (req.file) {
    req.body.cert_file = req.file.filename;
  }
      try{
        const certif = new Certification ({
          domaine : req.body.domaine,
          date : req.body.date,
          credential : req.body.credential,
          cert_file : req.body.cert_file,
          cv : req.body.cv
        })
      const cert= await certif.save()
      res.status(200).json(cert);
    }
      catch(err) {
        res.status(500).json(err)
      }
};
module.exports.addSkill = async function (req, res, next) {
 
      try{
        const skill = new Skill ({
          name : req.body.name,
          level : req.body.level,
          cv : req.body.cv
        })
      const s= await skill.save()
      res.status(200).json(s);
    }
      catch(err) {
        res.status(500).json(err)
      }
};
module.exports.addLanguage = async function (req, res, next) {
 
      try{
        const language = new Language ({
          name : req.body.name,
          level : req.body.level,
          cv : req.body.cv
        })
      const l= await language.save()
      res.status(200).json(l);
    }
      catch(err) {
        res.status(500).json(err)
      }
};
module.exports.addProject = async function (req, res, next) {
  
      try{
       const project = new Project({
        title: req.body.title,
        organization : req.body.organization,
        date : req.body.date,
        description : req.body.description,
        cv : req.body.cv
       })
      const p= await project.save()
      res.status(200).json(p);
    }
      catch(err) {
        res.status(500).json(err.message)
      }
};




module.exports.getEducation = async function (req, res, next) {
  const cvID = req.params.id;
  if (!ObjectId.isValid(cvID)) {
    return res.status(404).json("ID is not valid");
  }
    try{
      const e= await Education.find({ cv:cvID })
      res.status(200).json(e);
    }catch(err) {
        res.status(500).json(err)
      }
};
module.exports.getExperience = async function (req, res, next) {
  const cvID = req.params.id;
  if (!ObjectId.isValid(cvID)) {
    return res.status(404).json("ID is not valid");
  }
      try{
      const exp= await Experience.find({ cv:cvID })
      res.status(200).json(exp);
    }
      catch(err) {
        res.status(500).json(err)
      }
};
module.exports.getCertif = async function (req, res, next) {
  const cvID = req.params.id;
  if (!ObjectId.isValid(cvID)) {
    return res.status(404).json("ID is not valid");
  }
      try{
      const cert= await Certification.find({ cv:cvID })
      res.status(200).json(cert);
    }
      catch(err) {
        res.status(500).json(err)
      }
};
module.exports.getSkill = async function (req, res, next) {
  const cvID = req.params.id;
  if (!ObjectId.isValid(cvID)) {
    return res.status(404).json("ID is not valid");
  }
      try{
      const skill= await Skill.find({ cv:cvID })
      res.status(200).json(skill);
    }
      catch(err) {
        res.status(500).json(err)
      }
};
module.exports.getLanguage = async function (req, res, next) {
  const cvID = req.params.id;
  if (!ObjectId.isValid(cvID)) {
    return res.status(404).json("ID is not valid");
  }
      try{
      const language= await Language.find({ cv:cvID })
      res.status(200).json(language);
    }
      catch(err) {
        res.status(500).json(err)
      }
};
module.exports.getProject = async function (req, res, next) {
  const cvID = req.params.id;
  if (!ObjectId.isValid(cvID)) {
    return res.status(404).json("ID is not valid");
  }
      try{
      const project= await Project.find({cv : cvID})
      res.status(200).json(project);
    }
      catch(err) {
        res.status(500).json(err)
      }
};
module.exports.getUserCV = async function (req, res, next) {
  const userID = req.params.id;
  if (!ObjectId.isValid(userID)) {
    return res.status(404).json("ID is not valid");
  }
      try{
      const cv= await Cv.find({user : userID})
      res.status(200).json(cv);
    }
      catch(err) {
        res.status(500).json(err)
      }
};
module.exports.getSummary = async function (req, res, next) {
  const userID = req.params.id;
  if (!ObjectId.isValid(userID)) {
    return res.status(404).json("ID is not valid");
  }
      try{
      const cv= await Cv.findOne({user : userID})
      .select('summary -_id')
      res.status(200).json(cv);
    }
      catch(err) {
        res.status(500).json(err)
      }
};



module.exports.updateEducation = async function (req, res, next) {
  const ID = req.params.id;
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
      try{
      const e= await Education.findByIdAndUpdate(ID, 
       {
        establishment:req.body.establishment,
        section:req.body.section,
        diploma:req.body.diploma,
        year_start:req.body.year_start,
        year_end:req.body.year_end,
        present: req.body.present || false,
        cv: req.body.cv
       }).populate('cv')
        res.status(200).json(e);
    }
      catch(err) {
        res.status(500).json(err)
      }
};
module.exports.updateExperience = async function (req, res, next) {
  const ID = req.params.id;
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
      try{
      const exp= await Experience.findByIdAndUpdate(ID, 
        { 
          company:req.body.company,
          job:req.body.job,
          start:req.body.start,
          end:req.body.end,
          present:req.body.present || false,
          task_description:req.body.task_description,
          cv:req.body.cv

        }).populate('cv')
      res.status(200).json(exp);
    }
      catch(err) {
        res.status(500).json(err)
      }
};
module.exports.updateCertif = async function (req, res, next) {
  const ID = req.params.id;
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
      try{
        if (req.file) {
          req.body.cert_file = req.file.filename;
        }
      const cert= await Certification.findByIdAndUpdate(ID, 
        {
          domaine : req.body.domaine,
          date : req.body.date,
          credential : req.body.credential,
          cert_file: req.body.cert_file,
          cv : req.body.cv
       }).populate('cv')
      res.status(200).json(cert);
    }
      catch(err) {
        res.status(500).json(err)
      }
};
module.exports.updateSkill = async function (req, res, next) {
  const ID = req.params.id;
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
      try{
      const skill= await Skill.findByIdAndUpdate(ID, 
        {
          name:req.body.name,
          level:req.body.level,
          cv:req.body.cv
        }).populate('cv')
      res.status(200).json(skill);
    }
      catch(err) {
        res.status(500).json(err)
      }
};
module.exports.updateLanguage = async function (req, res, next) {
  const ID = req.params.id;
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
      try{
      const language= await Language.findByIdAndUpdate(ID, 
        {
          name:req.body.name,
          level:req.body.level,
          cv:req.body.cv
        }).populate('cv')
      res.status(200).json(language);
    }
      catch(err) {
        res.status(500).json(err)
      }
};
module.exports.updateSummary = async function (req, res, next) {
  const ID = req.params.id;
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
      try{
      const cv= await Cv.findByIdAndUpdate(ID, 
        {
          summary:req.body.summary,
          user:req.body.user
        })
      res.status(200).json(cv);
    }
      catch(err) {
        res.status(500).json(err)
      }
};
module.exports.updateProject = async function (req, res, next) {
  const ID = req.params.id;
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
      try{
      const project= await Project.findByIdAndUpdate(ID, 
        {
          organization:req.body.organization,
          title:req.body.title,
          date:req.body.date,
          description:req.body.description,
          cv:req.body.cv
        }).populate('cv')
      res.status(200).json(project);
    }
      catch(err) {
        res.status(500).json(err)
      }
};




module.exports.deleteEducation = async function (req, res) {
  const ID = req.params.id;

  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try{
    const edu= await Education.findByIdAndDelete({
      _id:ID 
    })
    return  res.status(200).json(edu);
    }
    catch(err) {
      res.status(500).json(err)
    };
};
module.exports.deleteExperience = async function (req, res) {
  const ID = req.params.id;

  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try{
    const exp= await Experience.findByIdAndDelete({_id:ID})
    return  res.status(200).json(exp);
    }
    catch(err) {
      res.status(500).json(err)
    };
};
module.exports.deleteCertif = async function (req, res) {
  const ID = req.params.id;

  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try{
    const cert= await Certification.findByIdAndDelete({_id:ID})
    return  res.status(200).json(cert);
    }
    catch(err) {
      res.status(500).json(err)
    };
};
module.exports.deleteLanguage = async function (req, res) {
  const ID = req.params.id;

  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try{
    const language= await Language.findByIdAndDelete({_id:ID}).populate('cv')
    return  res.status(200).json(language);
    }
    catch(err) {
      res.status(500).json(err)
    };
};
module.exports.deleteSkill = async function (req, res) {
  const ID = req.params.id;

  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try{
    const skill= await Skill.findByIdAndDelete({_id:ID}).populate('cv')
    return  res.status(200).json(skill);
    }
    catch(err) {
      res.status(500).json(err)
    };
};
module.exports.deleteProject = async function (req, res) {
  const ID = req.params.id;

  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try{
    const p= await Project.findByIdAndDelete({_id:ID}).populate('cv')
    return  res.status(200).json(p);
    }
    catch(err) {
      res.status(500).json(err)
    };
};

module.exports.downloadResume = async function (req, res, next) {
  try {
    const resumeData = { ...req.body };
    const doc = new PDFDocument({ size: "A4", margins: { top: 20, bottom: 20, left: 40, right: 40 } });

    const fileName = `resume_${resumeData.user.firstName}_${resumeData.user.lastName}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    doc.pipe(res);
    doc.registerFont('NotoSans', './tools/NotoSans-VariableFont.ttf');
    doc.registerFont('FontAwesome', './tools/fontawesome-webfont.ttf');  // FontAwesome for icons


    // Header Section (User Info) with image
    doc.rect(0, 0, doc.page.width, 160)  // Blue background for header
      .fill('#2980b9');
    const imageX = doc.page.margins.left ; // Adjust X position for the image
    const imageY = 20; // Y position for the image
    const imageWidth = 120; // Width for the image
    const borderWidth = 3; // Width of the white border
    const radius = imageWidth / 2; // Radius for the rounded image
    // Ensure image path exists before adding the image
    if (resumeData.user.image && fs.existsSync(IMAGE_PATH + resumeData.user.image)) {
      // Draw a white border circle
      doc.fillColor('#ffffff') // Set fill color for the border
        .circle(imageX + radius, imageY + radius, radius + borderWidth) // Positioning for the border
        .fill();

      // Clip to a circle for rounded image
      doc.save(); // Save the current state
      doc.roundedRect(imageX, imageY, imageWidth, imageWidth, radius); // Create a rounded rectangle
      doc.clip(); // Clip the following drawing to this shape

      // Add the image, clipped to the rounded rectangle
      doc.image(IMAGE_PATH + resumeData.user.image, imageX, imageY, { width: imageWidth });

      doc.restore(); // Restore the previous state to remove clipping
    } else {
      console.warn('Profile image not found, skipping image.');
    }
    // Position the text next to the image
    const textX = imageX + imageWidth + 40; // Adjust X position for the text to be next to the image
    const textY = imageY; // Y position matches the image
    // doc.moveDown(6)


    // Set initial positions for the text and icons
    const iconX = textX;  // Adjust X for the icons
    const iconSize = 9;  // Set icon size
    const textYOffset = 15;  // Offset for text positioning

    // Draw Name and Position with NotoSans
    doc.font('NotoSans')  // Use NotoSans for regular text
      .fillColor('#ffffff')
      .fontSize(20)
      .text(`${resumeData.user.firstName} ${resumeData.user.lastName}`, textX, textY)
      .fontSize(10)
      .text(`${resumeData.user.currentPosition}`, textX, textY + 25)
    // Use FontAwesome for icons
    doc.font('FontAwesome')
      .fontSize(iconSize)
      .text('\uf0e0', iconX, textY + 45)  // Email icon
      .text('\uf08c', iconX, textY + 45 + textYOffset)  // LinkedIn icon
      .text('\uf09b', iconX, textY + 45 + textYOffset * 2)  // GitHub icon
      .text('\uf095', iconX, textY + 45 + textYOffset * 3);  // Phone icon

    // Switch back to NotoSans for the actual text next to icons
    doc.font('NotoSans')
      .text(`${resumeData.user.email}`, textX + 20, textY + 44)
      .text(`${resumeData.user.cv.linkedin}`, textX + 20, textY + 44 + textYOffset, { link: resumeData.user.cv.linkedin })
      .text(`${resumeData.user.cv.github}`, textX + 20, textY + 44 + textYOffset * 2, { link: resumeData.user.cv.github })
      .text(`+216 ${resumeData.user.phone}`, textX + 20, textY + 44 + textYOffset * 3)
      .moveDown(2);

    const addSectionTitle = (title) => {
      doc.fontSize(13).fillColor('#2980b9').text(title, { underline: true, align: 'left' });
      doc.moveDown();
    };
    doc.x = 40
    doc.moveDown(3)
    addSectionTitle('Summary');
    doc.fontSize(7).fillColor('black').text(resumeData.user.cv.summary, { align: 'justify' });
    doc.moveDown();

    addSectionTitle('Skills');

    const skillPadding = 5;  // Padding inside the skill badge
    const badgeHeight = 20;  // Height of the skill badge
    const badgeMargin = 5;   // Margin between skill badges
    const maxSkillsPerRow = 9; // Maximum number of skills per row
    const borderRadius = 10; // Border radius for the badges

    let currentY = doc.y;  // Track the current Y position for skills
    let currentX = 40; // Track the current X position on the line

    resumeData.skills.forEach((skill, index) => {
      // Calculate the width of the text inside the badge
      const skillTextWidth = doc.widthOfString(skill.name);

      // Adjust the badge width by adding padding and a small margin
      const skillBadgeWidth = skillTextWidth + skillPadding * 2 + 2;

      // Draw the skill badge (rectangle with rounded corners)
      doc
        .fontSize(7)
        .fill('#ecf0f1')  // Set background color of the badge
        .roundedRect(currentX, currentY, skillBadgeWidth, badgeHeight, borderRadius)
        .fill();  // Fill the badge

      // Set text color and draw the skill name inside the badge
      doc.fillColor('#333')
        .text(skill.name, currentX + skillPadding, currentY + (badgeHeight / 4), { // Vertically align the text inside the badge
          width: skillBadgeWidth - skillPadding * 2, // Ensure text stays within the badge
          align: 'center'
        });

      // Move X position for the next skill badge
      currentX += skillBadgeWidth + badgeMargin;

      // If max skills per row reached, move to the next row
      if ((index + 1) % maxSkillsPerRow === 0) {
        currentY += badgeHeight + badgeMargin;  // Move down for a new row
        currentX = 40;  // Reset X to the left margin
      }
    });


    doc.moveDown(2);
    doc.x = 40;

    addSectionTitle('Experiences');
    resumeData.experiences.forEach((exp) => {
      const startDate = new Date(exp.start).toLocaleDateString('en', { year: 'numeric', month: 'short' });
      const endDate = exp.present ? 'Present' : new Date(exp.end).toLocaleDateString('en', { year: 'numeric', month: 'short' });

      const dateColumnWidth = 100;
      const jobColumnX = doc.page.margins.left + dateColumnWidth + 10;

      doc
        .fontSize(8)
        .fillColor('#2980b9')
        .text(`${startDate} - ${endDate}`, doc.page.margins.left, doc.y, { width: dateColumnWidth, align: 'left' });

      doc
        .fontSize(10)
        .text(`${exp.job} at ${exp.company}`, jobColumnX, doc.y - 15, { align: 'left' })
        .moveDown(0.5);

      doc
        .fontSize(7)
        .fillColor('black')
        .text(exp.task_description, { align: 'justify' });

      doc.moveDown();
    });

    doc.x = 40;
    addSectionTitle('Educations');
    resumeData.educations.forEach((edu) => {
      const startDate = new Date(edu.year_start).toLocaleDateString('en', { year: 'numeric', month: 'short' });
      const endDate = edu.present ? 'Present' : new Date(edu.year_end).toLocaleDateString('en', { year: 'numeric', month: 'short' });

      const dateColumnWidth = 100;
      const educationColumnX = doc.page.margins.left + dateColumnWidth + 10;

      doc
        .fontSize(8)
        .fillColor('#2980b9')
        .text(`${startDate} - ${endDate}`, doc.page.margins.left, doc.y, { width: dateColumnWidth, align: 'left' });

      doc
        .fontSize(10)
        .text(`${edu.diploma} in ${edu.section} from ${edu.establishment}`, educationColumnX, doc.y - 15, { align: 'left' });

      doc.moveDown();
    });
    doc.x = 40;
    addSectionTitle('Projects');
    resumeData.projets.forEach((project) => {
      const projectDate = new Date(project.date).toLocaleDateString('en', { year: 'numeric', month: 'short' });

      const dateColumnWidth = 100;
      const projectColumnX = doc.page.margins.left + dateColumnWidth + 10;
      doc
        .fontSize(8)
        .fillColor('#2980b9')
        .text(`${projectDate}`, doc.page.margins.left, doc.y, { width: dateColumnWidth, align: 'left' });

      doc
        .fontSize(10)
        .text(`${project.title} at ${project.organization}`, projectColumnX, doc.y - 15, { align: 'left' });

      doc.moveDown(0.5);

      doc
        .fontSize(7)
        .fillColor('black')
        .text(project.description, { align: 'justify' });

      doc.moveDown();
    });
    doc.x = 40;
    addSectionTitle('Certifications');
    resumeData.certifications.forEach((cert) => {
      const certDate = new Date(cert.date).toLocaleDateString('en', { year: 'numeric', month: 'short' });

      const dateColumnWidth = 100;
      const certColumnX = doc.page.margins.left + dateColumnWidth + 10;

      doc
        .fontSize(7)
        .fillColor('#2980b9')
        .text(`${certDate}`, doc.page.margins.left, doc.y, { width: dateColumnWidth, align: 'left' });

      doc
        .fontSize(10)
        .text(`${cert.domaine}`, certColumnX, doc.y - 15, { align: 'left' });

      doc.moveDown(0.5);

      if (cert.credential) {
        doc
          .fontSize(7)
          .fillColor('black')
          .text(`Credential: ${cert.credential}`, certColumnX, doc.y, { align: 'left' });
      }

      doc.moveDown();
    });
    doc.x = 40;
    addSectionTitle('Languages');
    resumeData.languages.forEach((lang) => {
      doc.fontSize(9).text(`${lang.name}: ${lang.level}`);
    });
    doc.end();

  } catch (error) {
    console.error('Error generating resume PDF:', error);
    next(error);
  }

}



module.exports.filterCvs = async function (req, res) {
  var skillsFilter = req.body.skills;
 
  if (skillsFilter) {
    skillsFilter = skillsFilter.trim().length === 0 ? null : skillsFilter;
  }
  try {
    if (skillsFilter) {
      const cvs = await Cvs.skills.find({
        roles: { $ne: "admin" },
        isEnabled: isNotEnabledFilter ? false : true,
        _id: { $ne: res.locals.user._id },
      skillsFilter : req.body.skills,
      })
      .select(skillsFilter);

     if (cvs) {
        res.status(200).json(cvs);
      }
    } 
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports.searchCvs = async function (req, res) {
  var skillsFilter = req.body.skills;

  if (skillsFilter) {
    skillsFilter = skillsFilter.trim().length === 0 ? null : skillsFilter;
  }
  try {
    const cvs = await Cvs.skills.find({
      roles: { $ne: "admin" },
      isEnabled: isNotEnabledFilter ? false : true,
      _id: { $ne: res.locals.user._id },
     
      skills: skillsFilter
        ? new RegExp(skillsFilter, "i")
        : new RegExp("[a-zA-Z]"),
    })
      .select(skillsFilter);
    if (cvs) {
      res.status(200).json(cvs);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
