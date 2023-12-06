/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

const minimumAnnouncement = {
	id: {
		type: 'string',
		optional: false, nullable: false,
		format: 'id',
		example: 'xxxxxxxxxx',
	},
	createdAt: {
		type: 'string',
		optional: false, nullable: false,
		format: 'date-time',
	},
	updatedAt: {
		type: 'string',
		optional: false, nullable: true,
		format: 'date-time',
	},
	text: {
		type: 'string',
		optional: false, nullable: false,
	},
	title: {
		type: 'string',
		optional: false, nullable: false,
	},
	imageUrl: {
		type: 'string',
		optional: false, nullable: true,
	},
	icon: {
		type: 'string',
		optional: false, nullable: false,
		enum: ['info', 'warning', 'error', 'success'],
	},
	display: {
		type: 'string',
		optional: false, nullable: false,
		enum: ['normal', 'banner', 'dialog'],
	},
	needConfirmationToRead: {
		type: 'boolean',
		optional: false, nullable: false,
	},
	silence: {
		type: 'boolean',
		optional: false, nullable: false,
	},
} as const;

export const packedAnnouncementSchema = {
	type: 'object',
	properties: {
		...minimumAnnouncement,
		forYou: {
			type: 'boolean',
			optional: false, nullable: false,
		},
		isRead: {
			type: 'boolean',
			optional: true, nullable: false,
		},
	},
} as const;

export const packedAnnouncementDetailedSchema = {
	type: 'object',
	properties: {
		...minimumAnnouncement,
		isActive: {
			type: 'boolean',
			optional: false, nullable: false,
		},
		forExistingUsers: {
			type: 'boolean',
			optional: false, nullable: false,
		},
		userId: {
			type: 'string',
			optional: false, nullable: true,
			format: 'id',
		},
		reads: {
			type: 'integer',
			optional: false, nullable: false,
		},
	},
} as const;
