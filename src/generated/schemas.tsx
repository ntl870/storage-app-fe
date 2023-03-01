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
  ID: Scalars['Float'];
  fileType: Scalars['String'];
  folder?: Maybe<Folder>;
  name: Scalars['String'];
  ownerID: Scalars['String'];
  url: Scalars['String'];
};

export type Folder = {
  ID: Scalars['String'];
  files?: Maybe<Array<File>>;
  name: Scalars['String'];
  ownerID: Scalars['String'];
  path: Scalars['String'];
  rootFolder?: Maybe<Folder>;
  subFolders?: Maybe<Array<Folder>>;
};

export type Mutation = {
  createFolder: Folder;
  login: Scalars['String'];
  signup: NewUserReturn;
  uploadFile: File;
  uploadFolder: Scalars['String'];
};


export type MutationCreateFolderArgs = {
  input: NewFolderInput;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
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


export const GetFilesByFolderDocument = gql`
    query getFilesByFolder($folderID: String!) {
  getFilesByFolder(folderID: $folderID) {
    ID
    name
    url
    fileType
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
export type GetFilesByFolderQueryVariables = Exact<{
  folderID: Scalars['String'];
}>;


export type GetFilesByFolderQuery = { getFilesByFolder: Array<{ ID: number, name: string, url: string, fileType: string }> };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { getMe: { ID: string, name: string, email: string, rootFolder: { ID: string } } };

export type GetUserFoldersQueryVariables = Exact<{
  folderID: Scalars['String'];
}>;


export type GetUserFoldersQuery = { getUserFolders: Array<{ ID: string, name: string, path: string, files?: Array<{ ID: number, name: string, url: string, fileType: string }> | null, subFolders?: Array<{ ID: string, name: string, path: string }> | null }> };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { login: string };

export type UploadFolderMutationVariables = Exact<{
  input: UploadFolderInput;
}>;


export type UploadFolderMutation = { uploadFolder: string };
