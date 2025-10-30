import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Instance validators
export const createInstanceValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    instanceName: Joi.string().required().min(3).max(50),
    qrcode: Joi.boolean().optional(),
    integration: Joi.string().optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation Error',
        details: error.details[0].message,
      },
    });
  }
  next();
};

// Message validators
export const sendTextMessageValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    number: Joi.string().required().pattern(/^\d+$/),
    text: Joi.string().required().min(1),
    delay: Joi.number().optional().min(0),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation Error',
        details: error.details[0].message,
      },
    });
  }
  next();
};

export const sendMediaMessageValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    number: Joi.string().required().pattern(/^\d+$/),
    mediatype: Joi.string().required().valid('image', 'video', 'audio', 'document'),
    media: Joi.string().required().uri(),
    caption: Joi.string().optional(),
    fileName: Joi.string().optional(),
    delay: Joi.number().optional().min(0),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation Error',
        details: error.details[0].message,
      },
    });
  }
  next();
};

export const sendListMessageValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    number: Joi.string().required().pattern(/^\d+$/),
    title: Joi.string().required(),
    description: Joi.string().optional(),
    buttonText: Joi.string().required(),
    footerText: Joi.string().optional(),
    sections: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
        rows: Joi.array().items(
          Joi.object({
            title: Joi.string().required(),
            description: Joi.string().optional(),
            rowId: Joi.string().required(),
          })
        ).required(),
      })
    ).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation Error',
        details: error.details[0].message,
      },
    });
  }
  next();
};

export const sendButtonMessageValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    number: Joi.string().required().pattern(/^\d+$/),
    title: Joi.string().required(),
    description: Joi.string().optional(),
    footer: Joi.string().optional(),
    buttons: Joi.array().items(
      Joi.object({
        buttonId: Joi.string().required(),
        buttonText: Joi.object({
          displayText: Joi.string().required(),
        }).required(),
        type: Joi.number().optional(),
      })
    ).required().min(1).max(3),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation Error',
        details: error.details[0].message,
      },
    });
  }
  next();
};

// Contact validators
export const checkNumberValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    numbers: Joi.array().items(Joi.string().pattern(/^\d+$/)).required().min(1),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation Error',
        details: error.details[0].message,
      },
    });
  }
  next();
};

// Group validators
export const createGroupValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    subject: Joi.string().required().min(3).max(100),
    participants: Joi.array().items(Joi.string().pattern(/^\d+$/)).required().min(1),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation Error',
        details: error.details[0].message,
      },
    });
  }
  next();
};

export const updateGroupParticipantsValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    groupJid: Joi.string().required(),
    action: Joi.string().required().valid('add', 'remove', 'promote', 'demote'),
    participants: Joi.array().items(Joi.string().pattern(/^\d+$/)).required().min(1),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation Error',
        details: error.details[0].message,
      },
    });
  }
  next();
};

// Webhook validators
export const setWebhookValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    url: Joi.string().required().uri(),
    webhook_by_events: Joi.boolean().optional(),
    webhook_base64: Joi.boolean().optional(),
    events: Joi.array().items(Joi.string()).optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation Error',
        details: error.details[0].message,
      },
    });
  }
  next();
};

// Instance name parameter validator
export const instanceNameValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    instanceName: Joi.string().required().min(3).max(50),
  });

  const { error } = schema.validate({ instanceName: req.params.instanceName });
  if (error) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Invalid instance name',
        details: error.details[0].message,
      },
    });
  }
  next();
};
