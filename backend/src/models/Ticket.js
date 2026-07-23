import mongoose from 'mongoose';
import { TICKET_STATUSES, TICKET_PRIORITIES } from '../constants/ticket.js';

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [200, 'Title must not exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [10000, 'Description must not exceed 10000 characters'],
    },
    status: {
      type: String,
      enum: {
        values: TICKET_STATUSES,
        message: 'Status must be one of: open, in_progress, resolved',
      },
      default: 'open',
    },
    priority: {
      type: String,
      enum: {
        values: TICKET_PRIORITIES,
        message: 'Priority must be one of: low, medium, high',
      },
      default: 'medium',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Created by user is required'],
    },
  },
  {
    timestamps: true,
  }
);

ticketSchema.index({ status: 1, createdAt: -1 });
ticketSchema.index({ priority: 1, createdAt: -1 });

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
