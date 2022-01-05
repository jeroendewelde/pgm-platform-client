import React, { ReactElement } from 'react'
import client from '../../../../apollo-client'
import { DELETE_LEARNING_LINE } from '../../../../graphql/learningLines'




interface DeleteRecordProps {
	entity: string
	id: string
	
}

export default function DeleteRecord({ entity, id }: DeleteRecordProps) {
	const deleteQueries = {
		learningLine: DELETE_LEARNING_LINE,
	}
	
	console.log('id....', id);
	console.log('entity....', entity);
	console.log('alll queries....', deleteQueries);
	console.log('query....', deleteQueries[entity]);

	// const response = client.mutate({
	// 	mutation: deleteQueries[entity],
	// 	variables: {
	// 		id: id
	// 	}
	// })
	
}
