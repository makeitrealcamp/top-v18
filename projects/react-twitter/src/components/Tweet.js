import React from 'react';
import { Card } from 'react-bootstrap';
import { formatDistance } from 'date-fns';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { source } from '@cloudinary/url-gen/actions/overlay';

import { text } from '@cloudinary/url-gen/qualifiers/source';
import { Position } from '@cloudinary/url-gen/qualifiers/position';
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle';
import { compass } from '@cloudinary/url-gen/qualifiers/gravity';

export default function Tweet({
	content = '',
	location = '',
	user = {},
	createdAt = '',
	likes = 0,
	photo = '',
}) {
	const cld = new Cloudinary({
		cloud: {
			cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
		},
	});

	const image = cld.image(photo);
	image
		.resize(fill().height(100).width(700))
		.overlay(
			source(
				text(
					user.username,
					new TextStyle('arial', 18).fontWeight('bold')
				).textColor('white')
			).position(
				new Position()
					.gravity(compass('north_west'))
					.offsetX(10)
					.offsetY(10)
			)
		);

	return (
		<Card className="mb-4">
			<Card.Body>
				<Card.Title>{user.username}</Card.Title>
				<AdvancedImage cldImg={image} style={{ maxWidth: '100%' }} />
				<Card.Subtitle className="mb-2 text-muted">
					{createdAt
						? formatDistance(new Date(), new Date(createdAt))
						: ''}
				</Card.Subtitle>
				<Card.Text>{content}</Card.Text>
				<Card.Link href="#">{likes} likes</Card.Link>
			</Card.Body>
		</Card>
	);
}
