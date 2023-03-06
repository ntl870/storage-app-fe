import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type File = {
  ID: Scalars['String'];
  fileType: Scalars['String'];
  folder?: Maybe<Folder>;
  isTrash: Scalars['Boolean'];
  name: Scalars['String'];
  ownerID: Scalars['String'];
  url: Scalars['String'];
};

export type Folder = {
  ID: Scalars['String'];
  files?: Maybe<Array<File>>;
  isTrash: Scalars['Boolean'];
  name: Scalars['String'];
  ownerID: Scalars['String'];
  path: Scalars['String'];
  rootFolder?: Maybe<Folder>;
  subFolders?: Maybe<Array<Folder>>;
};

export type Mutation = {
  createFolder: Folder;
  deleteFile: Scalars['String'];
  deleteFolder: Scalars['String'];
  login: Scalars['String'];
  moveFileToTrash: File;
  moveFolderOutOfTrash: Scalars['String'];
  moveFolderToTrash: Scalars['String'];
  restoreFileFromTrash: File;
  signup: NewUserReturn;
  uploadFile: File;
  uploadFolder: Scalars['String'];
};


export type MutationCreateFolderArgs = {
  input: NewFolderInput;
};


export type MutationDeleteFileArgs = {
  fileID: Scalars['String'];
};


export type MutationDeleteFolderArgs = {
  folderID: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationMoveFileToTrashArgs = {
  fileID: Scalars['String'];
};


export type MutationMoveFolderOutOfTrashArgs = {
  folderID: Scalars['String'];
};


export type MutationMoveFolderToTrashArgs = {
  folderID: Scalars['String'];
};


export type MutationRestoreFileFromTrashArgs = {
  fileID: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
  folderID: Scalars['String'];
};


export type MutationUploadFolderArgs = {
  input: UploadFolderInput;
};

export type NewFolderInput = {
  name: Scalars['String'];
  rootFolderID?: InputMaybe<Scalars['String']>;
};

export type NewUserReturn = {
  accessToken: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
};

export type Query = {
  getAllUsers: Array<User>;
  getFileByID: File;
  getFilesByFolder: Array<File>;
  getMe: User;
  getUserByID: User;
  getUserFiles: Array<File>;
  getUserFolders: Array<Folder>;
  getUserTrashFiles: Array<File>;
  getUserTrashFolder: Array<Folder>;
};


export type QueryGetFileByIdArgs = {
  ID: Scalars['String'];
};


export type QueryGetFilesByFolderArgs = {
  folderID: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  ID: Scalars['String'];
};


export type QueryGetUserFoldersArgs = {
  folderID: Scalars['String'];
};

export type UploadFolder = {
  files?: InputMaybe<Array<Scalars['Upload']>>;
  folders?: InputMaybe<Array<UploadFolder>>;
  name: Scalars['String'];
};

export type UploadFolderInput = {
  folder: UploadFolder;
  rootFolderID: Scalars['String'];
};

export type User = {
  ID: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  rootFolder: Folder;
};


export const DeleteFileDocument = gql`
    mutation deleteFile($fileID: String!) {
  deleteFile(fileID: $fileID)
}
    `;
export type DeleteFileMutationFn = Apollo.MutationFunction<DeleteFileMutation, DeleteFileMutationVariables>;

/**
 * __useDeleteFileMutation__
 *
 * To run a mutation, you first call `useDeleteFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFileMutation, { data, loading, error }] = useDeleteFileMutation({
 *   variables: {
 *      fileID: // value for 'fileID'
 *   },
 * });
 */
export function useDeleteFileMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFileMutation, DeleteFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFileMutation, DeleteFileMutationVariables>(DeleteFileDocument, options);
      }
export type DeleteFileMutationHookResult = ReturnType<typeof useDeleteFileMutation>;
export type DeleteFileMutationResult = Apollo.MutationResult<DeleteFileMutation>;
export type DeleteFileMutationOptions = Apollo.BaseMutationOptions<DeleteFileMutation, DeleteFileMutationVariables>;
export const DeleteFolderDocument = gql`
    mutation deleteFolder($folderID: String!) {
  deleteFolder(folderID: $folderID)
}
    `;
export type DeleteFolderMutationFn = Apollo.MutationFunction<DeleteFolderMutation, DeleteFolderMutationVariables>;

/**
 * __useDeleteFolderMutation__
 *
 * To run a mutation, you first call `useDeleteFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFolderMutation, { data, loading, error }] = useDeleteFolderMutation({
 *   variables: {
 *      folderID: // value for 'folderID'
 *   },
 * });
 */
export function useDeleteFolderMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFolderMutation, DeleteFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFolderMutation, DeleteFolderMutationVariables>(DeleteFolderDocument, options);
      }
export type DeleteFolderMutationHookResult = ReturnType<typeof useDeleteFolderMutation>;
export type DeleteFolderMutationResult = Apollo.MutationResult<DeleteFolderMutation>;
export type DeleteFolderMutationOptions = Apollo.BaseMutationOptions<DeleteFolderMutation, DeleteFolderMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MoveFileToTrashDocument = gql`
    mutation moveFileToTrash($fileID: String!) {
  moveFileToTrash(fileID: $fileID) {
    ID
    name
  }
}
    `;
export type MoveFileToTrashMutationFn = Apollo.MutationFunction<MoveFileToTrashMutation, MoveFileToTrashMutationVariables>;

/**
 * __useMoveFileToTrashMutation__
 *
 * To run a mutation, you first call `useMoveFileToTrashMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveFileToTrashMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveFileToTrashMutation, { data, loading, error }] = useMoveFileToTrashMutation({
 *   variables: {
 *      fileID: // value for 'fileID'
 *   },
 * });
 */
export function useMoveFileToTrashMutation(baseOptions?: Apollo.MutationHookOptions<MoveFileToTrashMutation, MoveFileToTrashMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveFileToTrashMutation, MoveFileToTrashMutationVariables>(MoveFileToTrashDocument, options);
      }
export type MoveFileToTrashMutationHookResult = ReturnType<typeof useMoveFileToTrashMutation>;
export type MoveFileToTrashMutationResult = Apollo.MutationResult<MoveFileToTrashMutation>;
export type MoveFileToTrashMutationOptions = Apollo.BaseMutationOptions<MoveFileToTrashMutation, MoveFileToTrashMutationVariables>;
export const MoveFolderOutOfTrashDocument = gql`
    mutation moveFolderOutOfTrash($folderID: String!) {
  moveFolderOutOfTrash(folderID: $folderID)
}
    `;
export type MoveFolderOutOfTrashMutationFn = Apollo.MutationFunction<MoveFolderOutOfTrashMutation, MoveFolderOutOfTrashMutationVariables>;

/**
 * __useMoveFolderOutOfTrashMutation__
 *
 * To run a mutation, you first call `useMoveFolderOutOfTrashMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveFolderOutOfTrashMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveFolderOutOfTrashMutation, { data, loading, error }] = useMoveFolderOutOfTrashMutation({
 *   variables: {
 *      folderID: // value for 'folderID'
 *   },
 * });
 */
export function useMoveFolderOutOfTrashMutation(baseOptions?: Apollo.MutationHookOptions<MoveFolderOutOfTrashMutation, MoveFolderOutOfTrashMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveFolderOutOfTrashMutation, MoveFolderOutOfTrashMutationVariables>(MoveFolderOutOfTrashDocument, options);
      }
export type MoveFolderOutOfTrashMutationHookResult = ReturnType<typeof useMoveFolderOutOfTrashMutation>;
export type MoveFolderOutOfTrashMutationResult = Apollo.MutationResult<MoveFolderOutOfTrashMutation>;
export type MoveFolderOutOfTrashMutationOptions = Apollo.BaseMutationOptions<MoveFolderOutOfTrashMutation, MoveFolderOutOfTrashMutationVariables>;
export const MoveFolderToTrashDocument = gql`
    mutation moveFolderToTrash($folderID: String!) {
  moveFolderToTrash(folderID: $folderID)
}
    `;
export type MoveFolderToTrashMutationFn = Apollo.MutationFunction<MoveFolderToTrashMutation, MoveFolderToTrashMutationVariables>;

/**
 * __useMoveFolderToTrashMutation__
 *
 * To run a mutation, you first call `useMoveFolderToTrashMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveFolderToTrashMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveFolderToTrashMutation, { data, loading, error }] = useMoveFolderToTrashMutation({
 *   variables: {
 *      folderID: // value for 'folderID'
 *   },
 * });
 */
export function useMoveFolderToTrashMutation(baseOptions?: Apollo.MutationHookOptions<MoveFolderToTrashMutation, MoveFolderToTrashMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveFolderToTrashMutation, MoveFolderToTrashMutationVariables>(MoveFolderToTrashDocument, options);
      }
export type MoveFolderToTrashMutationHookResult = ReturnType<typeof useMoveFolderToTrashMutation>;
export type MoveFolderToTrashMutationResult = Apollo.MutationResult<MoveFolderToTrashMutation>;
export type MoveFolderToTrashMutationOptions = Apollo.BaseMutationOptions<MoveFolderToTrashMutation, MoveFolderToTrashMutationVariables>;
export const RestoreFileFromTrashDocument = gql`
    mutation restoreFileFromTrash($fileID: String!) {
  restoreFileFromTrash(fileID: $fileID) {
    ID
    name
  }
}
    `;
export type RestoreFileFromTrashMutationFn = Apollo.MutationFunction<RestoreFileFromTrashMutation, RestoreFileFromTrashMutationVariables>;

/**
 * __useRestoreFileFromTrashMutation__
 *
 * To run a mutation, you first call `useRestoreFileFromTrashMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreFileFromTrashMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreFileFromTrashMutation, { data, loading, error }] = useRestoreFileFromTrashMutation({
 *   variables: {
 *      fileID: // value for 'fileID'
 *   },
 * });
 */
export function useRestoreFileFromTrashMutation(baseOptions?: Apollo.MutationHookOptions<RestoreFileFromTrashMutation, RestoreFileFromTrashMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RestoreFileFromTrashMutation, RestoreFileFromTrashMutationVariables>(RestoreFileFromTrashDocument, options);
      }
export type RestoreFileFromTrashMutationHookResult = ReturnType<typeof useRestoreFileFromTrashMutation>;
export type RestoreFileFromTrashMutationResult = Apollo.MutationResult<RestoreFileFromTrashMutation>;
export type RestoreFileFromTrashMutationOptions = Apollo.BaseMutationOptions<RestoreFileFromTrashMutation, RestoreFileFromTrashMutationVariables>;
export const UploadFolderDocument = gql`
    mutation uploadFolder($input: UploadFolderInput!) {
  uploadFolder(input: $input)
}
    `;
export type UploadFolderMutationFn = Apollo.MutationFunction<UploadFolderMutation, UploadFolderMutationVariables>;

/**
 * __useUploadFolderMutation__
 *
 * To run a mutation, you first call `useUploadFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFolderMutation, { data, loading, error }] = useUploadFolderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadFolderMutation(baseOptions?: Apollo.MutationHookOptions<UploadFolderMutation, UploadFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadFolderMutation, UploadFolderMutationVariables>(UploadFolderDocument, options);
      }
export type UploadFolderMutationHookResult = ReturnType<typeof useUploadFolderMutation>;
export type UploadFolderMutationResult = Apollo.MutationResult<UploadFolderMutation>;
export type UploadFolderMutationOptions = Apollo.BaseMutationOptions<UploadFolderMutation, UploadFolderMutationVariables>;
export const GetFilesByFolderDocument = gql`
    query getFilesByFolder($folderID: String!) {
  getFilesByFolder(folderID: $folderID) {
    ID
    name
    url
    fileType
    isTrash
  }
}
    `;

/**
 * __useGetFilesByFolderQuery__
 *
 * To run a query within a React component, call `useGetFilesByFolderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilesByFolderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilesByFolderQuery({
 *   variables: {
 *      folderID: // value for 'folderID'
 *   },
 * });
 */
export function useGetFilesByFolderQuery(baseOptions: Apollo.QueryHookOptions<GetFilesByFolderQuery, GetFilesByFolderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFilesByFolderQuery, GetFilesByFolderQueryVariables>(GetFilesByFolderDocument, options);
      }
export function useGetFilesByFolderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFilesByFolderQuery, GetFilesByFolderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFilesByFolderQuery, GetFilesByFolderQueryVariables>(GetFilesByFolderDocument, options);
        }
export type GetFilesByFolderQueryHookResult = ReturnType<typeof useGetFilesByFolderQuery>;
export type GetFilesByFolderLazyQueryHookResult = ReturnType<typeof useGetFilesByFolderLazyQuery>;
export type GetFilesByFolderQueryResult = Apollo.QueryResult<GetFilesByFolderQuery, GetFilesByFolderQueryVariables>;
export function refetchGetFilesByFolderQuery(variables: GetFilesByFolderQueryVariables) {
      return { query: GetFilesByFolderDocument, variables: variables }
    }
export const GetMeDocument = gql`
    query getMe {
  getMe {
    ID
    name
    email
    rootFolder {
      ID
    }
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export function refetchGetMeQuery(variables?: GetMeQueryVariables) {
      return { query: GetMeDocument, variables: variables }
    }
export const GetUserFoldersDocument = gql`
    query getUserFolders($folderID: String!) {
  getUserFolders(folderID: $folderID) {
    ID
    name
    files {
      ID
      name
      url
      fileType
    }
    subFolders {
      ID
      name
      path
    }
    path
    isTrash
  }
}
    `;

/**
 * __useGetUserFoldersQuery__
 *
 * To run a query within a React component, call `useGetUserFoldersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFoldersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFoldersQuery({
 *   variables: {
 *      folderID: // value for 'folderID'
 *   },
 * });
 */
export function useGetUserFoldersQuery(baseOptions: Apollo.QueryHookOptions<GetUserFoldersQuery, GetUserFoldersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserFoldersQuery, GetUserFoldersQueryVariables>(GetUserFoldersDocument, options);
      }
export function useGetUserFoldersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserFoldersQuery, GetUserFoldersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserFoldersQuery, GetUserFoldersQueryVariables>(GetUserFoldersDocument, options);
        }
export type GetUserFoldersQueryHookResult = ReturnType<typeof useGetUserFoldersQuery>;
export type GetUserFoldersLazyQueryHookResult = ReturnType<typeof useGetUserFoldersLazyQuery>;
export type GetUserFoldersQueryResult = Apollo.QueryResult<GetUserFoldersQuery, GetUserFoldersQueryVariables>;
export function refetchGetUserFoldersQuery(variables: GetUserFoldersQueryVariables) {
      return { query: GetUserFoldersDocument, variables: variables }
    }
export const GetUserTrashFilesDocument = gql`
    query getUserTrashFiles {
  getUserTrashFiles {
    ID
    name
    url
    fileType
    isTrash
  }
}
    `;

/**
 * __useGetUserTrashFilesQuery__
 *
 * To run a query within a React component, call `useGetUserTrashFilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTrashFilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTrashFilesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserTrashFilesQuery(baseOptions?: Apollo.QueryHookOptions<GetUserTrashFilesQuery, GetUserTrashFilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserTrashFilesQuery, GetUserTrashFilesQueryVariables>(GetUserTrashFilesDocument, options);
      }
export function useGetUserTrashFilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserTrashFilesQuery, GetUserTrashFilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserTrashFilesQuery, GetUserTrashFilesQueryVariables>(GetUserTrashFilesDocument, options);
        }
export type GetUserTrashFilesQueryHookResult = ReturnType<typeof useGetUserTrashFilesQuery>;
export type GetUserTrashFilesLazyQueryHookResult = ReturnType<typeof useGetUserTrashFilesLazyQuery>;
export type GetUserTrashFilesQueryResult = Apollo.QueryResult<GetUserTrashFilesQuery, GetUserTrashFilesQueryVariables>;
export function refetchGetUserTrashFilesQuery(variables?: GetUserTrashFilesQueryVariables) {
      return { query: GetUserTrashFilesDocument, variables: variables }
    }
export const GetUserTrashFolderDocument = gql`
    query getUserTrashFolder {
  getUserTrashFolder {
    ID
    name
    files {
      ID
      name
      url
      fileType
    }
    subFolders {
      ID
      name
      path
    }
    path
    isTrash
  }
}
    `;

/**
 * __useGetUserTrashFolderQuery__
 *
 * To run a query within a React component, call `useGetUserTrashFolderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTrashFolderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTrashFolderQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserTrashFolderQuery(baseOptions?: Apollo.QueryHookOptions<GetUserTrashFolderQuery, GetUserTrashFolderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserTrashFolderQuery, GetUserTrashFolderQueryVariables>(GetUserTrashFolderDocument, options);
      }
export function useGetUserTrashFolderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserTrashFolderQuery, GetUserTrashFolderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserTrashFolderQuery, GetUserTrashFolderQueryVariables>(GetUserTrashFolderDocument, options);
        }
export type GetUserTrashFolderQueryHookResult = ReturnType<typeof useGetUserTrashFolderQuery>;
export type GetUserTrashFolderLazyQueryHookResult = ReturnType<typeof useGetUserTrashFolderLazyQuery>;
export type GetUserTrashFolderQueryResult = Apollo.QueryResult<GetUserTrashFolderQuery, GetUserTrashFolderQueryVariables>;
export function refetchGetUserTrashFolderQuery(variables?: GetUserTrashFolderQueryVariables) {
      return { query: GetUserTrashFolderDocument, variables: variables }
    }
export type DeleteFileMutationVariables = Exact<{
  fileID: Scalars['String'];
}>;


export type DeleteFileMutation = { deleteFile: string };

export type DeleteFolderMutationVariables = Exact<{
  folderID: Scalars['String'];
}>;


export type DeleteFolderMutation = { deleteFolder: string };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { login: string };

export type MoveFileToTrashMutationVariables = Exact<{
  fileID: Scalars['String'];
}>;


export type MoveFileToTrashMutation = { moveFileToTrash: { ID: string, name: string } };

export type MoveFolderOutOfTrashMutationVariables = Exact<{
  folderID: Scalars['String'];
}>;


export type MoveFolderOutOfTrashMutation = { moveFolderOutOfTrash: string };

export type MoveFolderToTrashMutationVariables = Exact<{
  folderID: Scalars['String'];
}>;


export type MoveFolderToTrashMutation = { moveFolderToTrash: string };

export type RestoreFileFromTrashMutationVariables = Exact<{
  fileID: Scalars['String'];
}>;


export type RestoreFileFromTrashMutation = { restoreFileFromTrash: { ID: string, name: string } };

export type UploadFolderMutationVariables = Exact<{
  input: UploadFolderInput;
}>;


export type UploadFolderMutation = { uploadFolder: string };

export type GetFilesByFolderQueryVariables = Exact<{
  folderID: Scalars['String'];
}>;


export type GetFilesByFolderQuery = { getFilesByFolder: Array<{ ID: string, name: string, url: string, fileType: string, isTrash: boolean }> };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { getMe: { ID: string, name: string, email: string, rootFolder: { ID: string } } };

export type GetUserFoldersQueryVariables = Exact<{
  folderID: Scalars['String'];
}>;


export type GetUserFoldersQuery = { getUserFolders: Array<{ ID: string, name: string, path: string, isTrash: boolean, files?: Array<{ ID: string, name: string, url: string, fileType: string }> | null, subFolders?: Array<{ ID: string, name: string, path: string }> | null }> };

export type GetUserTrashFilesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserTrashFilesQuery = { getUserTrashFiles: Array<{ ID: string, name: string, url: string, fileType: string, isTrash: boolean }> };

export type GetUserTrashFolderQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserTrashFolderQuery = { getUserTrashFolder: Array<{ ID: string, name: string, path: string, isTrash: boolean, files?: Array<{ ID: string, name: string, url: string, fileType: string }> | null, subFolders?: Array<{ ID: string, name: string, path: string }> | null }> };
