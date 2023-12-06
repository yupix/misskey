/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Injectable } from '@nestjs/common';
import { Endpoint } from '@/server/api/endpoint-base.js';
import { AnnouncementService } from '@/core/AnnouncementService.js';

export const meta = {
	tags: ['admin'],

	requireCredential: true,
	requireModerator: true,

	res: {
		type: 'object',
		optional: false, nullable: false,
		ref: 'AnnouncementDetailed',
	},
} as const;

export const paramDef = {
	type: 'object',
	properties: {
		title: { type: 'string', minLength: 1 },
		text: { type: 'string', minLength: 1 },
		imageUrl: { type: 'string', nullable: true, minLength: 1 },
		icon: { type: 'string', enum: ['info', 'warning', 'error', 'success'], default: 'info' },
		display: { type: 'string', enum: ['normal', 'banner', 'dialog'], default: 'normal' },
		forExistingUsers: { type: 'boolean', default: false },
		silence: { type: 'boolean', default: false },
		needConfirmationToRead: { type: 'boolean', default: false },
		userId: { type: 'string', format: 'misskey:id', nullable: true, default: null },
	},
	required: ['title', 'text', 'imageUrl'],
} as const;

@Injectable()
export default class extends Endpoint<typeof meta, typeof paramDef> { // eslint-disable-line import/no-default-export
	constructor(
		private announcementService: AnnouncementService,
	) {
		super(meta, paramDef, async (ps, me) => {
			const { raw, packed } = await this.announcementService.create({
				updatedAt: null,
				title: ps.title,
				text: ps.text,
				imageUrl: ps.imageUrl,
				icon: ps.icon,
				display: ps.display,
				forExistingUsers: ps.forExistingUsers,
				silence: ps.silence,
				needConfirmationToRead: ps.needConfirmationToRead,
				userId: ps.userId,
			}, me);

			return packed;
		});
	}
}
