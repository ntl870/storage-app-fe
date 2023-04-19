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
  isPublic: Scalars['Boolean'];
  isTrash: Scalars['Boolean'];
  name: Scalars['String'];
  ownerID: Scalars['String'];
  readonlyUsers?: Maybe<Array<User>>;
  sharedUsers?: Maybe<Array<User>>;
  starredUsers?: Maybe<Array<User>>;
  url: Scalars['String'];
};

export type Folder = {
  ID: Scalars['String'];
  files?: Maybe<Array<File>>;
  isPublic: Scalars['Boolean'];
  isTrash: Scalars['Boolean'];
  name: Scalars['String'];
  ownerID: Scalars['String'];
  path: Scalars['String'];
  readonlyUsers?: Maybe<Array<User>>;
  rootFolder?: Maybe<Folder>;
  sharedUsers?: Maybe<Array<User>>;
  starredUsers?: Maybe<Array<User>>;
  subFolders?: Maybe<Array<Folder>>;
};

export type Mutation = {
  addSharedUserToFolder: Scalars['String'];
  addUserToFolderReadOnlyUsers: Scalars['String'];
  addUsersToReadonlyFile: Scalars['String'];
  addUsersToSharedUserFile: Scalars['String'];
  changeUserRoleInFile: Scalars['String'];
  changeUserRoleInFolder: Scalars['String'];
  createFolder: Folder;
  deleteFile: Scalars['String'];
  deleteFolder: Scalars['String'];
  emptyUserTrash: Scalars['String'];
  login: Scalars['String'];
  moveFileToTrash: File;
  moveFolderOutOfTrash: Scalars['String'];
  moveFolderToTrash: Scalars['String'];
  removeUserFromFile: Scalars['String'];
  removeUserFromFolder: Scalars['String'];
  restoreFileFromTrash: File;
  setGeneralAccessOfFile: Scalars['String'];
  setGeneralFolderAccess: Scalars['String'];
  signup: NewUserReturn;
  starFile: Scalars['String'];
  starFolder: Scalars['String'];
  uploadFile: File;
  uploadFolder: Scalars['String'];
};


export type MutationAddSharedUserToFolderArgs = {
  folderID: Scalars['String'];
  sharedUserIDs: Array<Scalars['String']>;
  shouldSendMail: Scalars['Boolean'];
  userMessage?: InputMaybe<Scalars['String']>;
};


export type MutationAddUserToFolderReadOnlyUsersArgs = {
  folderID: Scalars['String'];
  readOnlyUserIDs: Array<Scalars['String']>;
  shouldSendMail: Scalars['Boolean'];
  userMessage?: InputMaybe<Scalars['String']>;
};


export type MutationAddUsersToReadonlyFileArgs = {
  fileID: Scalars['String'];
  readonlyUserIDs: Array<Scalars['String']>;
  shouldSendMail: Scalars['Boolean'];
  userMessage?: InputMaybe<Scalars['String']>;
};


export type MutationAddUsersToSharedUserFileArgs = {
  fileID: Scalars['String'];
  sharedUserIDs: Array<Scalars['String']>;
  shouldSendMail: Scalars['Boolean'];
  userMessage?: InputMaybe<Scalars['String']>;
};


export type MutationChangeUserRoleInFileArgs = {
  fileID: Scalars['String'];
  targetRole: Scalars['String'];
  targetUserID: Scalars['String'];
};


export type MutationChangeUserRoleInFolderArgs = {
  folderID: Scalars['String'];
  targetRole: Scalars['String'];
  targetUserID: Scalars['String'];
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


export type MutationRemoveUserFromFileArgs = {
  fileID: Scalars['String'];
  targetUserID: Scalars['String'];
};


export type MutationRemoveUserFromFolderArgs = {
  folderID: Scalars['String'];
  targetUserID: Scalars['String'];
};


export type MutationRestoreFileFromTrashArgs = {
  fileID: Scalars['String'];
};


export type MutationSetGeneralAccessOfFileArgs = {
  fileID: Scalars['String'];
  isPublic: Scalars['Boolean'];
};


export type MutationSetGeneralFolderAccessArgs = {
  folderID: Scalars['String'];
  isPublic: Scalars['Boolean'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationStarFileArgs = {
  fileID: Scalars['String'];
};


export type MutationStarFolderArgs = {
  folderID: Scalars['String'];
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

export type PeopleWithAccessResponse = {
  isPublic: Scalars['Boolean'];
  owner: User;
  readonlyUsers: Array<User>;
  sharedUsers: Array<User>;
};

export type Query = {
  getAllUsers: Array<User>;
  getArrayOfRootFoldersName: Array<Folder>;
  getFileByID: File;
  getFileByIDWithAccess: File;
  getFilesByFolder: Array<File>;
  getFoldersOfFolder: Array<Folder>;
  getMe: User;
  getPeopleWithAccessToFile: PeopleWithAccessResponse;
  getPeopleWithAccessToFolder: PeopleWithAccessResponse;
  getStarredFiles: Array<File>;
  getStarredFolders: Array<Folder>;
  getUserByID: User;
  getUserFiles: Array<File>;
  getUserSharedFiles: Array<File>;
  getUserSharedFolders: Array<Folder>;
  getUserTrashFiles: Array<File>;
  getUserTrashFolder: Array<Folder>;
  getUsersBySearchPagination: UserSearchPaginationResponse;
};


export type QueryGetArrayOfRootFoldersNameArgs = {
  folderID: Scalars['String'];
};


export type QueryGetFileByIdArgs = {
  ID: Scalars['String'];
};


export type QueryGetFileByIdWithAccessArgs = {
  fileID: Scalars['String'];
};


export type QueryGetFilesByFolderArgs = {
  folderID: Scalars['String'];
};


export type QueryGetFoldersOfFolderArgs = {
  folderID: Scalars['String'];
};


export type QueryGetPeopleWithAccessToFileArgs = {
  fileID: Scalars['String'];
};


export type QueryGetPeopleWithAccessToFolderArgs = {
  folderID: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  ID: Scalars['String'];
};


export type QueryGetUsersBySearchPaginationArgs = {
  limit: Scalars['Float'];
  page: Scalars['Float'];
  search: Scalars['String'];
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
  avatar?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  rootFolder?: Maybe<Folder>;
};

export type UserSearchPaginationResponse = {
  hasMore: Scalars['Boolean'];
  results: Array<User>;
};


export const AddSharedUserToFolderDocument = gql`
    mutation addSharedUserToFolder($folderID: String!, $sharedUserIDs: [String!]!, $shouldSendMail: Boolean!, $userMessage: String) {
  addSharedUserToFolder(
    folderID: $folderID
    sharedUserIDs: $sharedUserIDs
    shouldSendMail: $shouldSendMail
    userMessage: $userMessage
  )
}
    `;
export type AddSharedUserToFolderMutationFn = Apollo.MutationFunction<AddSharedUserToFolderMutation, AddSharedUserToFolderMutationVariables>;

/**
 * __useAddSharedUserToFolderMutation__
 *
 * To run a mutation, you first call `useAddSharedUserToFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSharedUserToFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSharedUserToFolderMutation, { data, loading, error }] = useAddSharedUserToFolderMutation({
 *   variables: {
 *      folderID: // value for 'folderID'
 *      sharedUserIDs: // value for 'sharedUserIDs'
 *      shouldSendMail: // value for 'shouldSendMail'
 *      userMessage: // value for 'userMessage'
 *   },
 * });
 */
export function useAddSharedUserToFolderMutation(baseOptions?: Apollo.MutationHookOptions<AddSharedUserToFolderMutation, AddSharedUserToFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSharedUserToFolderMutation, AddSharedUserToFolderMutationVariables>(AddSharedUserToFolderDocument, options);
      }
export type AddSharedUserToFolderMutationHookResult = ReturnType<typeof useAddSharedUserToFolderMutation>;
export type AddSharedUserToFolderMutationResult = Apollo.MutationResult<AddSharedUserToFolderMutation>;
export type AddSharedUserToFolderMutationOptions = Apollo.BaseMutationOptions<AddSharedUserToFolderMutation, AddSharedUserToFolderMutationVariables>;
export const AddUserToFolderReadOnlyUsersDocument = gql`
    mutation addUserToFolderReadOnlyUsers($folderID: String!, $readOnlyUserIDs: [String!]!, $shouldSendMail: Boolean!, $userMessage: String) {
  addUserToFolderReadOnlyUsers(
    folderID: $folderID
    readOnlyUserIDs: $readOnlyUserIDs
    shouldSendMail: $shouldSendMail
    userMessage: $userMessage
  )
}
    `;
export type AddUserToFolderReadOnlyUsersMutationFn = Apollo.MutationFunction<AddUserToFolderReadOnlyUsersMutation, AddUserToFolderReadOnlyUsersMutationVariables>;

/**
 * __useAddUserToFolderReadOnlyUsersMutation__
 *
 * To run a mutation, you first call `useAddUserToFolderReadOnlyUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserToFolderReadOnlyUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserToFolderReadOnlyUsersMutation, { data, loading, error }] = useAddUserToFolderReadOnlyUsersMutation({
 *   variables: {
 *      folderID: // value for 'folderID'
 *      readOnlyUserIDs: // value for 'readOnlyUserIDs'
 *      shouldSendMail: // value for 'shouldSendMail'
 *      userMessage: // value for 'userMessage'
 *   },
 * });
 */
export function useAddUserToFolderReadOnlyUsersMutation(baseOptions?: Apollo.MutationHookOptions<AddUserToFolderReadOnlyUsersMutation, AddUserToFolderReadOnlyUsersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserToFolderReadOnlyUsersMutation, AddUserToFolderReadOnlyUsersMutationVariables>(AddUserToFolderReadOnlyUsersDocument, options);
      }
export type AddUserToFolderReadOnlyUsersMutationHookResult = ReturnType<typeof useAddUserToFolderReadOnlyUsersMutation>;
export type AddUserToFolderReadOnlyUsersMutationResult = Apollo.MutationResult<AddUserToFolderReadOnlyUsersMutation>;
export type AddUserToFolderReadOnlyUsersMutationOptions = Apollo.BaseMutationOptions<AddUserToFolderReadOnlyUsersMutation, AddUserToFolderReadOnlyUsersMutationVariables>;
export const AddUsersToSharedUserFileDocument = gql`
    mutation addUsersToSharedUserFile($fileID: String!, $sharedUserIDs: [String!]!, $shouldSendMail: Boolean!, $userMessage: String) {
  addUsersToSharedUserFile(
    fileID: $fileID
    sharedUserIDs: $sharedUserIDs
    shouldSendMail: $shouldSendMail
    userMessage: $userMessage
  )
}
    `;
export type AddUsersToSharedUserFileMutationFn = Apollo.MutationFunction<AddUsersToSharedUserFileMutation, AddUsersToSharedUserFileMutationVariables>;

/**
 * __useAddUsersToSharedUserFileMutation__
 *
 * To run a mutation, you first call `useAddUsersToSharedUserFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUsersToSharedUserFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUsersToSharedUserFileMutation, { data, loading, error }] = useAddUsersToSharedUserFileMutation({
 *   variables: {
 *      fileID: // value for 'fileID'
 *      sharedUserIDs: // value for 'sharedUserIDs'
 *      shouldSendMail: // value for 'shouldSendMail'
 *      userMessage: // value for 'userMessage'
 *   },
 * });
 */
export function useAddUsersToSharedUserFileMutation(baseOptions?: Apollo.MutationHookOptions<AddUsersToSharedUserFileMutation, AddUsersToSharedUserFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUsersToSharedUserFileMutation, AddUsersToSharedUserFileMutationVariables>(AddUsersToSharedUserFileDocument, options);
      }
export type AddUsersToSharedUserFileMutationHookResult = ReturnType<typeof useAddUsersToSharedUserFileMutation>;
export type AddUsersToSharedUserFileMutationResult = Apollo.MutationResult<AddUsersToSharedUserFileMutation>;
export type AddUsersToSharedUserFileMutationOptions = Apollo.BaseMutationOptions<AddUsersToSharedUserFileMutation, AddUsersToSharedUserFileMutationVariables>;
export const AddUsersToReadonlyFileDocument = gql`
    mutation addUsersToReadonlyFile($fileID: String!, $readonlyUserIDs: [String!]!, $shouldSendMail: Boolean!, $userMessage: String) {
  addUsersToReadonlyFile(
    fileID: $fileID
    readonlyUserIDs: $readonlyUserIDs
    shouldSendMail: $shouldSendMail
    userMessage: $userMessage
  )
}
    `;
export type AddUsersToReadonlyFileMutationFn = Apollo.MutationFunction<AddUsersToReadonlyFileMutation, AddUsersToReadonlyFileMutationVariables>;

/**
 * __useAddUsersToReadonlyFileMutation__
 *
 * To run a mutation, you first call `useAddUsersToReadonlyFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUsersToReadonlyFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUsersToReadonlyFileMutation, { data, loading, error }] = useAddUsersToReadonlyFileMutation({
 *   variables: {
 *      fileID: // value for 'fileID'
 *      readonlyUserIDs: // value for 'readonlyUserIDs'
 *      shouldSendMail: // value for 'shouldSendMail'
 *      userMessage: // value for 'userMessage'
 *   },
 * });
 */
export function useAddUsersToReadonlyFileMutation(baseOptions?: Apollo.MutationHookOptions<AddUsersToReadonlyFileMutation, AddUsersToReadonlyFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUsersToReadonlyFileMutation, AddUsersToReadonlyFileMutationVariables>(AddUsersToReadonlyFileDocument, options);
      }
export type AddUsersToReadonlyFileMutationHookResult = ReturnType<typeof useAddUsersToReadonlyFileMutation>;
export type AddUsersToReadonlyFileMutationResult = Apollo.MutationResult<AddUsersToReadonlyFileMutation>;
export type AddUsersToReadonlyFileMutationOptions = Apollo.BaseMutationOptions<AddUsersToReadonlyFileMutation, AddUsersToReadonlyFileMutationVariables>;
export const ChangeUserRoleInFileDocument = gql`
    mutation changeUserRoleInFile($fileID: String!, $targetUserID: String!, $targetRole: String!) {
  changeUserRoleInFile(
    fileID: $fileID
    targetUserID: $targetUserID
    targetRole: $targetRole
  )
}
    `;
export type ChangeUserRoleInFileMutationFn = Apollo.MutationFunction<ChangeUserRoleInFileMutation, ChangeUserRoleInFileMutationVariables>;

/**
 * __useChangeUserRoleInFileMutation__
 *
 * To run a mutation, you first call `useChangeUserRoleInFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeUserRoleInFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeUserRoleInFileMutation, { data, loading, error }] = useChangeUserRoleInFileMutation({
 *   variables: {
 *      fileID: // value for 'fileID'
 *      targetUserID: // value for 'targetUserID'
 *      targetRole: // value for 'targetRole'
 *   },
 * });
 */
export function useChangeUserRoleInFileMutation(baseOptions?: Apollo.MutationHookOptions<ChangeUserRoleInFileMutation, ChangeUserRoleInFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeUserRoleInFileMutation, ChangeUserRoleInFileMutationVariables>(ChangeUserRoleInFileDocument, options);
      }
export type ChangeUserRoleInFileMutationHookResult = ReturnType<typeof useChangeUserRoleInFileMutation>;
export type ChangeUserRoleInFileMutationResult = Apollo.MutationResult<ChangeUserRoleInFileMutation>;
export type ChangeUserRoleInFileMutationOptions = Apollo.BaseMutationOptions<ChangeUserRoleInFileMutation, ChangeUserRoleInFileMutationVariables>;
export const ChangeUserRoleInFolderDocument = gql`
    mutation changeUserRoleInFolder($folderID: String!, $targetUserID: String!, $targetRole: String!) {
  changeUserRoleInFolder(
    folderID: $folderID
    targetUserID: $targetUserID
    targetRole: $targetRole
  )
}
    `;
export type ChangeUserRoleInFolderMutationFn = Apollo.MutationFunction<ChangeUserRoleInFolderMutation, ChangeUserRoleInFolderMutationVariables>;

/**
 * __useChangeUserRoleInFolderMutation__
 *
 * To run a mutation, you first call `useChangeUserRoleInFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeUserRoleInFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeUserRoleInFolderMutation, { data, loading, error }] = useChangeUserRoleInFolderMutation({
 *   variables: {
 *      folderID: // value for 'folderID'
 *      targetUserID: // value for 'targetUserID'
 *      targetRole: // value for 'targetRole'
 *   },
 * });
 */
export function useChangeUserRoleInFolderMutation(baseOptions?: Apollo.MutationHookOptions<ChangeUserRoleInFolderMutation, ChangeUserRoleInFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeUserRoleInFolderMutation, ChangeUserRoleInFolderMutationVariables>(ChangeUserRoleInFolderDocument, options);
      }
export type ChangeUserRoleInFolderMutationHookResult = ReturnType<typeof useChangeUserRoleInFolderMutation>;
export type ChangeUserRoleInFolderMutationResult = Apollo.MutationResult<ChangeUserRoleInFolderMutation>;
export type ChangeUserRoleInFolderMutationOptions = Apollo.BaseMutationOptions<ChangeUserRoleInFolderMutation, ChangeUserRoleInFolderMutationVariables>;
export const CreateFolderDocument = gql`
    mutation createFolder($input: NewFolderInput!) {
  createFolder(input: $input) {
    ID
    name
  }
}
    `;
export type CreateFolderMutationFn = Apollo.MutationFunction<CreateFolderMutation, CreateFolderMutationVariables>;

/**
 * __useCreateFolderMutation__
 *
 * To run a mutation, you first call `useCreateFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFolderMutation, { data, loading, error }] = useCreateFolderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFolderMutation(baseOptions?: Apollo.MutationHookOptions<CreateFolderMutation, CreateFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFolderMutation, CreateFolderMutationVariables>(CreateFolderDocument, options);
      }
export type CreateFolderMutationHookResult = ReturnType<typeof useCreateFolderMutation>;
export type CreateFolderMutationResult = Apollo.MutationResult<CreateFolderMutation>;
export type CreateFolderMutationOptions = Apollo.BaseMutationOptions<CreateFolderMutation, CreateFolderMutationVariables>;
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
export const EmptyUserTrashDocument = gql`
    mutation emptyUserTrash {
  emptyUserTrash
}
    `;
export type EmptyUserTrashMutationFn = Apollo.MutationFunction<EmptyUserTrashMutation, EmptyUserTrashMutationVariables>;

/**
 * __useEmptyUserTrashMutation__
 *
 * To run a mutation, you first call `useEmptyUserTrashMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEmptyUserTrashMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [emptyUserTrashMutation, { data, loading, error }] = useEmptyUserTrashMutation({
 *   variables: {
 *   },
 * });
 */
export function useEmptyUserTrashMutation(baseOptions?: Apollo.MutationHookOptions<EmptyUserTrashMutation, EmptyUserTrashMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EmptyUserTrashMutation, EmptyUserTrashMutationVariables>(EmptyUserTrashDocument, options);
      }
export type EmptyUserTrashMutationHookResult = ReturnType<typeof useEmptyUserTrashMutation>;
export type EmptyUserTrashMutationResult = Apollo.MutationResult<EmptyUserTrashMutation>;
export type EmptyUserTrashMutationOptions = Apollo.BaseMutationOptions<EmptyUserTrashMutation, EmptyUserTrashMutationVariables>;
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
export const RemoveUserFromFileDocument = gql`
    mutation removeUserFromFile($fileID: String!, $targetUserID: String!) {
  removeUserFromFile(fileID: $fileID, targetUserID: $targetUserID)
}
    `;
export type RemoveUserFromFileMutationFn = Apollo.MutationFunction<RemoveUserFromFileMutation, RemoveUserFromFileMutationVariables>;

/**
 * __useRemoveUserFromFileMutation__
 *
 * To run a mutation, you first call `useRemoveUserFromFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserFromFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserFromFileMutation, { data, loading, error }] = useRemoveUserFromFileMutation({
 *   variables: {
 *      fileID: // value for 'fileID'
 *      targetUserID: // value for 'targetUserID'
 *   },
 * });
 */
export function useRemoveUserFromFileMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserFromFileMutation, RemoveUserFromFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserFromFileMutation, RemoveUserFromFileMutationVariables>(RemoveUserFromFileDocument, options);
      }
export type RemoveUserFromFileMutationHookResult = ReturnType<typeof useRemoveUserFromFileMutation>;
export type RemoveUserFromFileMutationResult = Apollo.MutationResult<RemoveUserFromFileMutation>;
export type RemoveUserFromFileMutationOptions = Apollo.BaseMutationOptions<RemoveUserFromFileMutation, RemoveUserFromFileMutationVariables>;
export const RemoveUserFromFolderDocument = gql`
    mutation removeUserFromFolder($folderID: String!, $targetUserID: String!) {
  removeUserFromFolder(folderID: $folderID, targetUserID: $targetUserID)
}
    `;
export type RemoveUserFromFolderMutationFn = Apollo.MutationFunction<RemoveUserFromFolderMutation, RemoveUserFromFolderMutationVariables>;

/**
 * __useRemoveUserFromFolderMutation__
 *
 * To run a mutation, you first call `useRemoveUserFromFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserFromFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserFromFolderMutation, { data, loading, error }] = useRemoveUserFromFolderMutation({
 *   variables: {
 *      folderID: // value for 'folderID'
 *      targetUserID: // value for 'targetUserID'
 *   },
 * });
 */
export function useRemoveUserFromFolderMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserFromFolderMutation, RemoveUserFromFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserFromFolderMutation, RemoveUserFromFolderMutationVariables>(RemoveUserFromFolderDocument, options);
      }
export type RemoveUserFromFolderMutationHookResult = ReturnType<typeof useRemoveUserFromFolderMutation>;
export type RemoveUserFromFolderMutationResult = Apollo.MutationResult<RemoveUserFromFolderMutation>;
export type RemoveUserFromFolderMutationOptions = Apollo.BaseMutationOptions<RemoveUserFromFolderMutation, RemoveUserFromFolderMutationVariables>;
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
export const SetGeneralAccessOfFileDocument = gql`
    mutation setGeneralAccessOfFile($fileID: String!, $isPublic: Boolean!) {
  setGeneralAccessOfFile(fileID: $fileID, isPublic: $isPublic)
}
    `;
export type SetGeneralAccessOfFileMutationFn = Apollo.MutationFunction<SetGeneralAccessOfFileMutation, SetGeneralAccessOfFileMutationVariables>;

/**
 * __useSetGeneralAccessOfFileMutation__
 *
 * To run a mutation, you first call `useSetGeneralAccessOfFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetGeneralAccessOfFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setGeneralAccessOfFileMutation, { data, loading, error }] = useSetGeneralAccessOfFileMutation({
 *   variables: {
 *      fileID: // value for 'fileID'
 *      isPublic: // value for 'isPublic'
 *   },
 * });
 */
export function useSetGeneralAccessOfFileMutation(baseOptions?: Apollo.MutationHookOptions<SetGeneralAccessOfFileMutation, SetGeneralAccessOfFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetGeneralAccessOfFileMutation, SetGeneralAccessOfFileMutationVariables>(SetGeneralAccessOfFileDocument, options);
      }
export type SetGeneralAccessOfFileMutationHookResult = ReturnType<typeof useSetGeneralAccessOfFileMutation>;
export type SetGeneralAccessOfFileMutationResult = Apollo.MutationResult<SetGeneralAccessOfFileMutation>;
export type SetGeneralAccessOfFileMutationOptions = Apollo.BaseMutationOptions<SetGeneralAccessOfFileMutation, SetGeneralAccessOfFileMutationVariables>;
export const SetGeneralFolderAccessDocument = gql`
    mutation setGeneralFolderAccess($folderID: String!, $isPublic: Boolean!) {
  setGeneralFolderAccess(folderID: $folderID, isPublic: $isPublic)
}
    `;
export type SetGeneralFolderAccessMutationFn = Apollo.MutationFunction<SetGeneralFolderAccessMutation, SetGeneralFolderAccessMutationVariables>;

/**
 * __useSetGeneralFolderAccessMutation__
 *
 * To run a mutation, you first call `useSetGeneralFolderAccessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetGeneralFolderAccessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setGeneralFolderAccessMutation, { data, loading, error }] = useSetGeneralFolderAccessMutation({
 *   variables: {
 *      folderID: // value for 'folderID'
 *      isPublic: // value for 'isPublic'
 *   },
 * });
 */
export function useSetGeneralFolderAccessMutation(baseOptions?: Apollo.MutationHookOptions<SetGeneralFolderAccessMutation, SetGeneralFolderAccessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetGeneralFolderAccessMutation, SetGeneralFolderAccessMutationVariables>(SetGeneralFolderAccessDocument, options);
      }
export type SetGeneralFolderAccessMutationHookResult = ReturnType<typeof useSetGeneralFolderAccessMutation>;
export type SetGeneralFolderAccessMutationResult = Apollo.MutationResult<SetGeneralFolderAccessMutation>;
export type SetGeneralFolderAccessMutationOptions = Apollo.BaseMutationOptions<SetGeneralFolderAccessMutation, SetGeneralFolderAccessMutationVariables>;
export const SignupDocument = gql`
    mutation signup($email: String!, $password: String!, $name: String!) {
  signup(email: $email, password: $password, name: $name) {
    name
    email
    accessToken
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const StarFileDocument = gql`
    mutation starFile($fileID: String!) {
  starFile(fileID: $fileID)
}
    `;
export type StarFileMutationFn = Apollo.MutationFunction<StarFileMutation, StarFileMutationVariables>;

/**
 * __useStarFileMutation__
 *
 * To run a mutation, you first call `useStarFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStarFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [starFileMutation, { data, loading, error }] = useStarFileMutation({
 *   variables: {
 *      fileID: // value for 'fileID'
 *   },
 * });
 */
export function useStarFileMutation(baseOptions?: Apollo.MutationHookOptions<StarFileMutation, StarFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StarFileMutation, StarFileMutationVariables>(StarFileDocument, options);
      }
export type StarFileMutationHookResult = ReturnType<typeof useStarFileMutation>;
export type StarFileMutationResult = Apollo.MutationResult<StarFileMutation>;
export type StarFileMutationOptions = Apollo.BaseMutationOptions<StarFileMutation, StarFileMutationVariables>;
export const StarFolderDocument = gql`
    mutation starFolder($folderID: String!) {
  starFolder(folderID: $folderID)
}
    `;
export type StarFolderMutationFn = Apollo.MutationFunction<StarFolderMutation, StarFolderMutationVariables>;

/**
 * __useStarFolderMutation__
 *
 * To run a mutation, you first call `useStarFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStarFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [starFolderMutation, { data, loading, error }] = useStarFolderMutation({
 *   variables: {
 *      folderID: // value for 'folderID'
 *   },
 * });
 */
export function useStarFolderMutation(baseOptions?: Apollo.MutationHookOptions<StarFolderMutation, StarFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StarFolderMutation, StarFolderMutationVariables>(StarFolderDocument, options);
      }
export type StarFolderMutationHookResult = ReturnType<typeof useStarFolderMutation>;
export type StarFolderMutationResult = Apollo.MutationResult<StarFolderMutation>;
export type StarFolderMutationOptions = Apollo.BaseMutationOptions<StarFolderMutation, StarFolderMutationVariables>;
export const UploadFileDocument = gql`
    mutation uploadFile($file: Upload!, $folderID: String!) {
  uploadFile(file: $file, folderID: $folderID) {
    ID
    name
    folder {
      ID
      name
    }
    url
    ownerID
  }
}
    `;
export type UploadFileMutationFn = Apollo.MutationFunction<UploadFileMutation, UploadFileMutationVariables>;

/**
 * __useUploadFileMutation__
 *
 * To run a mutation, you first call `useUploadFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileMutation, { data, loading, error }] = useUploadFileMutation({
 *   variables: {
 *      file: // value for 'file'
 *      folderID: // value for 'folderID'
 *   },
 * });
 */
export function useUploadFileMutation(baseOptions?: Apollo.MutationHookOptions<UploadFileMutation, UploadFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadFileMutation, UploadFileMutationVariables>(UploadFileDocument, options);
      }
export type UploadFileMutationHookResult = ReturnType<typeof useUploadFileMutation>;
export type UploadFileMutationResult = Apollo.MutationResult<UploadFileMutation>;
export type UploadFileMutationOptions = Apollo.BaseMutationOptions<UploadFileMutation, UploadFileMutationVariables>;
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
export const GetArrayOfRootFoldersNameDocument = gql`
    query getArrayOfRootFoldersName($folderID: String!) {
  getArrayOfRootFoldersName(folderID: $folderID) {
    ID
    name
  }
}
    `;

/**
 * __useGetArrayOfRootFoldersNameQuery__
 *
 * To run a query within a React component, call `useGetArrayOfRootFoldersNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArrayOfRootFoldersNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArrayOfRootFoldersNameQuery({
 *   variables: {
 *      folderID: // value for 'folderID'
 *   },
 * });
 */
export function useGetArrayOfRootFoldersNameQuery(baseOptions: Apollo.QueryHookOptions<GetArrayOfRootFoldersNameQuery, GetArrayOfRootFoldersNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArrayOfRootFoldersNameQuery, GetArrayOfRootFoldersNameQueryVariables>(GetArrayOfRootFoldersNameDocument, options);
      }
export function useGetArrayOfRootFoldersNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArrayOfRootFoldersNameQuery, GetArrayOfRootFoldersNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArrayOfRootFoldersNameQuery, GetArrayOfRootFoldersNameQueryVariables>(GetArrayOfRootFoldersNameDocument, options);
        }
export type GetArrayOfRootFoldersNameQueryHookResult = ReturnType<typeof useGetArrayOfRootFoldersNameQuery>;
export type GetArrayOfRootFoldersNameLazyQueryHookResult = ReturnType<typeof useGetArrayOfRootFoldersNameLazyQuery>;
export type GetArrayOfRootFoldersNameQueryResult = Apollo.QueryResult<GetArrayOfRootFoldersNameQuery, GetArrayOfRootFoldersNameQueryVariables>;
export function refetchGetArrayOfRootFoldersNameQuery(variables: GetArrayOfRootFoldersNameQueryVariables) {
      return { query: GetArrayOfRootFoldersNameDocument, variables: variables }
    }
export const GetFileByIdWithAccessDocument = gql`
    query getFileByIDWithAccess($fileID: String!) {
  getFileByIDWithAccess(fileID: $fileID) {
    ID
    name
    fileType
  }
}
    `;

/**
 * __useGetFileByIdWithAccessQuery__
 *
 * To run a query within a React component, call `useGetFileByIdWithAccessQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFileByIdWithAccessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFileByIdWithAccessQuery({
 *   variables: {
 *      fileID: // value for 'fileID'
 *   },
 * });
 */
export function useGetFileByIdWithAccessQuery(baseOptions: Apollo.QueryHookOptions<GetFileByIdWithAccessQuery, GetFileByIdWithAccessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFileByIdWithAccessQuery, GetFileByIdWithAccessQueryVariables>(GetFileByIdWithAccessDocument, options);
      }
export function useGetFileByIdWithAccessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFileByIdWithAccessQuery, GetFileByIdWithAccessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFileByIdWithAccessQuery, GetFileByIdWithAccessQueryVariables>(GetFileByIdWithAccessDocument, options);
        }
export type GetFileByIdWithAccessQueryHookResult = ReturnType<typeof useGetFileByIdWithAccessQuery>;
export type GetFileByIdWithAccessLazyQueryHookResult = ReturnType<typeof useGetFileByIdWithAccessLazyQuery>;
export type GetFileByIdWithAccessQueryResult = Apollo.QueryResult<GetFileByIdWithAccessQuery, GetFileByIdWithAccessQueryVariables>;
export function refetchGetFileByIdWithAccessQuery(variables: GetFileByIdWithAccessQueryVariables) {
      return { query: GetFileByIdWithAccessDocument, variables: variables }
    }
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
    avatar
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
export const GetPeopleWithAccessToFileDocument = gql`
    query getPeopleWithAccessToFile($fileID: String!) {
  getPeopleWithAccessToFile(fileID: $fileID) {
    sharedUsers {
      ID
      name
      email
      avatar
    }
    readonlyUsers {
      ID
      name
      email
      avatar
    }
    owner {
      ID
      name
      email
      avatar
    }
    isPublic
  }
}
    `;

/**
 * __useGetPeopleWithAccessToFileQuery__
 *
 * To run a query within a React component, call `useGetPeopleWithAccessToFileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPeopleWithAccessToFileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPeopleWithAccessToFileQuery({
 *   variables: {
 *      fileID: // value for 'fileID'
 *   },
 * });
 */
export function useGetPeopleWithAccessToFileQuery(baseOptions: Apollo.QueryHookOptions<GetPeopleWithAccessToFileQuery, GetPeopleWithAccessToFileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPeopleWithAccessToFileQuery, GetPeopleWithAccessToFileQueryVariables>(GetPeopleWithAccessToFileDocument, options);
      }
export function useGetPeopleWithAccessToFileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPeopleWithAccessToFileQuery, GetPeopleWithAccessToFileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPeopleWithAccessToFileQuery, GetPeopleWithAccessToFileQueryVariables>(GetPeopleWithAccessToFileDocument, options);
        }
export type GetPeopleWithAccessToFileQueryHookResult = ReturnType<typeof useGetPeopleWithAccessToFileQuery>;
export type GetPeopleWithAccessToFileLazyQueryHookResult = ReturnType<typeof useGetPeopleWithAccessToFileLazyQuery>;
export type GetPeopleWithAccessToFileQueryResult = Apollo.QueryResult<GetPeopleWithAccessToFileQuery, GetPeopleWithAccessToFileQueryVariables>;
export function refetchGetPeopleWithAccessToFileQuery(variables: GetPeopleWithAccessToFileQueryVariables) {
      return { query: GetPeopleWithAccessToFileDocument, variables: variables }
    }
export const GetPeopleWithAccessToFolderDocument = gql`
    query getPeopleWithAccessToFolder($folderID: String!) {
  getPeopleWithAccessToFolder(folderID: $folderID) {
    sharedUsers {
      ID
      name
      email
      avatar
    }
    readonlyUsers {
      ID
      name
      email
      avatar
    }
    owner {
      ID
      name
      email
      avatar
    }
    isPublic
  }
}
    `;

/**
 * __useGetPeopleWithAccessToFolderQuery__
 *
 * To run a query within a React component, call `useGetPeopleWithAccessToFolderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPeopleWithAccessToFolderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPeopleWithAccessToFolderQuery({
 *   variables: {
 *      folderID: // value for 'folderID'
 *   },
 * });
 */
export function useGetPeopleWithAccessToFolderQuery(baseOptions: Apollo.QueryHookOptions<GetPeopleWithAccessToFolderQuery, GetPeopleWithAccessToFolderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPeopleWithAccessToFolderQuery, GetPeopleWithAccessToFolderQueryVariables>(GetPeopleWithAccessToFolderDocument, options);
      }
export function useGetPeopleWithAccessToFolderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPeopleWithAccessToFolderQuery, GetPeopleWithAccessToFolderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPeopleWithAccessToFolderQuery, GetPeopleWithAccessToFolderQueryVariables>(GetPeopleWithAccessToFolderDocument, options);
        }
export type GetPeopleWithAccessToFolderQueryHookResult = ReturnType<typeof useGetPeopleWithAccessToFolderQuery>;
export type GetPeopleWithAccessToFolderLazyQueryHookResult = ReturnType<typeof useGetPeopleWithAccessToFolderLazyQuery>;
export type GetPeopleWithAccessToFolderQueryResult = Apollo.QueryResult<GetPeopleWithAccessToFolderQuery, GetPeopleWithAccessToFolderQueryVariables>;
export function refetchGetPeopleWithAccessToFolderQuery(variables: GetPeopleWithAccessToFolderQueryVariables) {
      return { query: GetPeopleWithAccessToFolderDocument, variables: variables }
    }
export const GetStarredFilesDocument = gql`
    query getStarredFiles {
  getStarredFiles {
    ID
    name
    url
  }
}
    `;

/**
 * __useGetStarredFilesQuery__
 *
 * To run a query within a React component, call `useGetStarredFilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStarredFilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStarredFilesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStarredFilesQuery(baseOptions?: Apollo.QueryHookOptions<GetStarredFilesQuery, GetStarredFilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStarredFilesQuery, GetStarredFilesQueryVariables>(GetStarredFilesDocument, options);
      }
export function useGetStarredFilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStarredFilesQuery, GetStarredFilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStarredFilesQuery, GetStarredFilesQueryVariables>(GetStarredFilesDocument, options);
        }
export type GetStarredFilesQueryHookResult = ReturnType<typeof useGetStarredFilesQuery>;
export type GetStarredFilesLazyQueryHookResult = ReturnType<typeof useGetStarredFilesLazyQuery>;
export type GetStarredFilesQueryResult = Apollo.QueryResult<GetStarredFilesQuery, GetStarredFilesQueryVariables>;
export function refetchGetStarredFilesQuery(variables?: GetStarredFilesQueryVariables) {
      return { query: GetStarredFilesDocument, variables: variables }
    }
export const GetStarredFoldersDocument = gql`
    query getStarredFolders {
  getStarredFolders {
    ID
    name
    path
  }
}
    `;

/**
 * __useGetStarredFoldersQuery__
 *
 * To run a query within a React component, call `useGetStarredFoldersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStarredFoldersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStarredFoldersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStarredFoldersQuery(baseOptions?: Apollo.QueryHookOptions<GetStarredFoldersQuery, GetStarredFoldersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStarredFoldersQuery, GetStarredFoldersQueryVariables>(GetStarredFoldersDocument, options);
      }
export function useGetStarredFoldersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStarredFoldersQuery, GetStarredFoldersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStarredFoldersQuery, GetStarredFoldersQueryVariables>(GetStarredFoldersDocument, options);
        }
export type GetStarredFoldersQueryHookResult = ReturnType<typeof useGetStarredFoldersQuery>;
export type GetStarredFoldersLazyQueryHookResult = ReturnType<typeof useGetStarredFoldersLazyQuery>;
export type GetStarredFoldersQueryResult = Apollo.QueryResult<GetStarredFoldersQuery, GetStarredFoldersQueryVariables>;
export function refetchGetStarredFoldersQuery(variables?: GetStarredFoldersQueryVariables) {
      return { query: GetStarredFoldersDocument, variables: variables }
    }
export const GetFoldersOfFolderDocument = gql`
    query getFoldersOfFolder($folderID: String!) {
  getFoldersOfFolder(folderID: $folderID) {
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
    isPublic
  }
}
    `;

/**
 * __useGetFoldersOfFolderQuery__
 *
 * To run a query within a React component, call `useGetFoldersOfFolderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFoldersOfFolderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFoldersOfFolderQuery({
 *   variables: {
 *      folderID: // value for 'folderID'
 *   },
 * });
 */
export function useGetFoldersOfFolderQuery(baseOptions: Apollo.QueryHookOptions<GetFoldersOfFolderQuery, GetFoldersOfFolderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFoldersOfFolderQuery, GetFoldersOfFolderQueryVariables>(GetFoldersOfFolderDocument, options);
      }
export function useGetFoldersOfFolderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFoldersOfFolderQuery, GetFoldersOfFolderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFoldersOfFolderQuery, GetFoldersOfFolderQueryVariables>(GetFoldersOfFolderDocument, options);
        }
export type GetFoldersOfFolderQueryHookResult = ReturnType<typeof useGetFoldersOfFolderQuery>;
export type GetFoldersOfFolderLazyQueryHookResult = ReturnType<typeof useGetFoldersOfFolderLazyQuery>;
export type GetFoldersOfFolderQueryResult = Apollo.QueryResult<GetFoldersOfFolderQuery, GetFoldersOfFolderQueryVariables>;
export function refetchGetFoldersOfFolderQuery(variables: GetFoldersOfFolderQueryVariables) {
      return { query: GetFoldersOfFolderDocument, variables: variables }
    }
export const GetUserSharedFilesDocument = gql`
    query getUserSharedFiles {
  getUserSharedFiles {
    ID
    name
    url
    fileType
    isTrash
  }
}
    `;

/**
 * __useGetUserSharedFilesQuery__
 *
 * To run a query within a React component, call `useGetUserSharedFilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserSharedFilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserSharedFilesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserSharedFilesQuery(baseOptions?: Apollo.QueryHookOptions<GetUserSharedFilesQuery, GetUserSharedFilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserSharedFilesQuery, GetUserSharedFilesQueryVariables>(GetUserSharedFilesDocument, options);
      }
export function useGetUserSharedFilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserSharedFilesQuery, GetUserSharedFilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserSharedFilesQuery, GetUserSharedFilesQueryVariables>(GetUserSharedFilesDocument, options);
        }
export type GetUserSharedFilesQueryHookResult = ReturnType<typeof useGetUserSharedFilesQuery>;
export type GetUserSharedFilesLazyQueryHookResult = ReturnType<typeof useGetUserSharedFilesLazyQuery>;
export type GetUserSharedFilesQueryResult = Apollo.QueryResult<GetUserSharedFilesQuery, GetUserSharedFilesQueryVariables>;
export function refetchGetUserSharedFilesQuery(variables?: GetUserSharedFilesQueryVariables) {
      return { query: GetUserSharedFilesDocument, variables: variables }
    }
export const GetUserSharedFoldersDocument = gql`
    query getUserSharedFolders {
  getUserSharedFolders {
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
    isPublic
  }
}
    `;

/**
 * __useGetUserSharedFoldersQuery__
 *
 * To run a query within a React component, call `useGetUserSharedFoldersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserSharedFoldersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserSharedFoldersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserSharedFoldersQuery(baseOptions?: Apollo.QueryHookOptions<GetUserSharedFoldersQuery, GetUserSharedFoldersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserSharedFoldersQuery, GetUserSharedFoldersQueryVariables>(GetUserSharedFoldersDocument, options);
      }
export function useGetUserSharedFoldersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserSharedFoldersQuery, GetUserSharedFoldersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserSharedFoldersQuery, GetUserSharedFoldersQueryVariables>(GetUserSharedFoldersDocument, options);
        }
export type GetUserSharedFoldersQueryHookResult = ReturnType<typeof useGetUserSharedFoldersQuery>;
export type GetUserSharedFoldersLazyQueryHookResult = ReturnType<typeof useGetUserSharedFoldersLazyQuery>;
export type GetUserSharedFoldersQueryResult = Apollo.QueryResult<GetUserSharedFoldersQuery, GetUserSharedFoldersQueryVariables>;
export function refetchGetUserSharedFoldersQuery(variables?: GetUserSharedFoldersQueryVariables) {
      return { query: GetUserSharedFoldersDocument, variables: variables }
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
export const GetUsersBySearchPaginationDocument = gql`
    query getUsersBySearchPagination($search: String!, $page: Float!, $limit: Float!) {
  getUsersBySearchPagination(search: $search, page: $page, limit: $limit) {
    results {
      ID
      name
      email
    }
    hasMore
  }
}
    `;

/**
 * __useGetUsersBySearchPaginationQuery__
 *
 * To run a query within a React component, call `useGetUsersBySearchPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersBySearchPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersBySearchPaginationQuery({
 *   variables: {
 *      search: // value for 'search'
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetUsersBySearchPaginationQuery(baseOptions: Apollo.QueryHookOptions<GetUsersBySearchPaginationQuery, GetUsersBySearchPaginationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersBySearchPaginationQuery, GetUsersBySearchPaginationQueryVariables>(GetUsersBySearchPaginationDocument, options);
      }
export function useGetUsersBySearchPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersBySearchPaginationQuery, GetUsersBySearchPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersBySearchPaginationQuery, GetUsersBySearchPaginationQueryVariables>(GetUsersBySearchPaginationDocument, options);
        }
export type GetUsersBySearchPaginationQueryHookResult = ReturnType<typeof useGetUsersBySearchPaginationQuery>;
export type GetUsersBySearchPaginationLazyQueryHookResult = ReturnType<typeof useGetUsersBySearchPaginationLazyQuery>;
export type GetUsersBySearchPaginationQueryResult = Apollo.QueryResult<GetUsersBySearchPaginationQuery, GetUsersBySearchPaginationQueryVariables>;
export function refetchGetUsersBySearchPaginationQuery(variables: GetUsersBySearchPaginationQueryVariables) {
      return { query: GetUsersBySearchPaginationDocument, variables: variables }
    }
export type AddSharedUserToFolderMutationVariables = Exact<{
  folderID: Scalars['String'];
  sharedUserIDs: Array<Scalars['String']> | Scalars['String'];
  shouldSendMail: Scalars['Boolean'];
  userMessage?: InputMaybe<Scalars['String']>;
}>;


export type AddSharedUserToFolderMutation = { addSharedUserToFolder: string };

export type AddUserToFolderReadOnlyUsersMutationVariables = Exact<{
  folderID: Scalars['String'];
  readOnlyUserIDs: Array<Scalars['String']> | Scalars['String'];
  shouldSendMail: Scalars['Boolean'];
  userMessage?: InputMaybe<Scalars['String']>;
}>;


export type AddUserToFolderReadOnlyUsersMutation = { addUserToFolderReadOnlyUsers: string };

export type AddUsersToSharedUserFileMutationVariables = Exact<{
  fileID: Scalars['String'];
  sharedUserIDs: Array<Scalars['String']> | Scalars['String'];
  shouldSendMail: Scalars['Boolean'];
  userMessage?: InputMaybe<Scalars['String']>;
}>;


export type AddUsersToSharedUserFileMutation = { addUsersToSharedUserFile: string };

export type AddUsersToReadonlyFileMutationVariables = Exact<{
  fileID: Scalars['String'];
  readonlyUserIDs: Array<Scalars['String']> | Scalars['String'];
  shouldSendMail: Scalars['Boolean'];
  userMessage?: InputMaybe<Scalars['String']>;
}>;


export type AddUsersToReadonlyFileMutation = { addUsersToReadonlyFile: string };

export type ChangeUserRoleInFileMutationVariables = Exact<{
  fileID: Scalars['String'];
  targetUserID: Scalars['String'];
  targetRole: Scalars['String'];
}>;


export type ChangeUserRoleInFileMutation = { changeUserRoleInFile: string };

export type ChangeUserRoleInFolderMutationVariables = Exact<{
  folderID: Scalars['String'];
  targetUserID: Scalars['String'];
  targetRole: Scalars['String'];
}>;


export type ChangeUserRoleInFolderMutation = { changeUserRoleInFolder: string };

export type CreateFolderMutationVariables = Exact<{
  input: NewFolderInput;
}>;


export type CreateFolderMutation = { createFolder: { ID: string, name: string } };

export type DeleteFileMutationVariables = Exact<{
  fileID: Scalars['String'];
}>;


export type DeleteFileMutation = { deleteFile: string };

export type DeleteFolderMutationVariables = Exact<{
  folderID: Scalars['String'];
}>;


export type DeleteFolderMutation = { deleteFolder: string };

export type EmptyUserTrashMutationVariables = Exact<{ [key: string]: never; }>;


export type EmptyUserTrashMutation = { emptyUserTrash: string };

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

export type RemoveUserFromFileMutationVariables = Exact<{
  fileID: Scalars['String'];
  targetUserID: Scalars['String'];
}>;


export type RemoveUserFromFileMutation = { removeUserFromFile: string };

export type RemoveUserFromFolderMutationVariables = Exact<{
  folderID: Scalars['String'];
  targetUserID: Scalars['String'];
}>;


export type RemoveUserFromFolderMutation = { removeUserFromFolder: string };

export type RestoreFileFromTrashMutationVariables = Exact<{
  fileID: Scalars['String'];
}>;


export type RestoreFileFromTrashMutation = { restoreFileFromTrash: { ID: string, name: string } };

export type SetGeneralAccessOfFileMutationVariables = Exact<{
  fileID: Scalars['String'];
  isPublic: Scalars['Boolean'];
}>;


export type SetGeneralAccessOfFileMutation = { setGeneralAccessOfFile: string };

export type SetGeneralFolderAccessMutationVariables = Exact<{
  folderID: Scalars['String'];
  isPublic: Scalars['Boolean'];
}>;


export type SetGeneralFolderAccessMutation = { setGeneralFolderAccess: string };

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
}>;


export type SignupMutation = { signup: { name: string, email: string, accessToken: string } };

export type StarFileMutationVariables = Exact<{
  fileID: Scalars['String'];
}>;


export type StarFileMutation = { starFile: string };

export type StarFolderMutationVariables = Exact<{
  folderID: Scalars['String'];
}>;


export type StarFolderMutation = { starFolder: string };

export type UploadFileMutationVariables = Exact<{
  file: Scalars['Upload'];
  folderID: Scalars['String'];
}>;


export type UploadFileMutation = { uploadFile: { ID: string, name: string, url: string, ownerID: string, folder?: { ID: string, name: string } | null } };

export type UploadFolderMutationVariables = Exact<{
  input: UploadFolderInput;
}>;


export type UploadFolderMutation = { uploadFolder: string };

export type GetArrayOfRootFoldersNameQueryVariables = Exact<{
  folderID: Scalars['String'];
}>;


export type GetArrayOfRootFoldersNameQuery = { getArrayOfRootFoldersName: Array<{ ID: string, name: string }> };

export type GetFileByIdWithAccessQueryVariables = Exact<{
  fileID: Scalars['String'];
}>;


export type GetFileByIdWithAccessQuery = { getFileByIDWithAccess: { ID: string, name: string, fileType: string } };

export type GetFilesByFolderQueryVariables = Exact<{
  folderID: Scalars['String'];
}>;


export type GetFilesByFolderQuery = { getFilesByFolder: Array<{ ID: string, name: string, url: string, fileType: string, isTrash: boolean }> };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { getMe: { ID: string, name: string, email: string, avatar?: string | null, rootFolder?: { ID: string } | null } };

export type GetPeopleWithAccessToFileQueryVariables = Exact<{
  fileID: Scalars['String'];
}>;


export type GetPeopleWithAccessToFileQuery = { getPeopleWithAccessToFile: { isPublic: boolean, sharedUsers: Array<{ ID: string, name: string, email: string, avatar?: string | null }>, readonlyUsers: Array<{ ID: string, name: string, email: string, avatar?: string | null }>, owner: { ID: string, name: string, email: string, avatar?: string | null } } };

export type GetPeopleWithAccessToFolderQueryVariables = Exact<{
  folderID: Scalars['String'];
}>;


export type GetPeopleWithAccessToFolderQuery = { getPeopleWithAccessToFolder: { isPublic: boolean, sharedUsers: Array<{ ID: string, name: string, email: string, avatar?: string | null }>, readonlyUsers: Array<{ ID: string, name: string, email: string, avatar?: string | null }>, owner: { ID: string, name: string, email: string, avatar?: string | null } } };

export type GetStarredFilesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStarredFilesQuery = { getStarredFiles: Array<{ ID: string, name: string, url: string }> };

export type GetStarredFoldersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStarredFoldersQuery = { getStarredFolders: Array<{ ID: string, name: string, path: string }> };

export type GetFoldersOfFolderQueryVariables = Exact<{
  folderID: Scalars['String'];
}>;


export type GetFoldersOfFolderQuery = { getFoldersOfFolder: Array<{ ID: string, name: string, path: string, isTrash: boolean, isPublic: boolean, files?: Array<{ ID: string, name: string, url: string, fileType: string }> | null, subFolders?: Array<{ ID: string, name: string, path: string }> | null }> };

export type GetUserSharedFilesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserSharedFilesQuery = { getUserSharedFiles: Array<{ ID: string, name: string, url: string, fileType: string, isTrash: boolean }> };

export type GetUserSharedFoldersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserSharedFoldersQuery = { getUserSharedFolders: Array<{ ID: string, name: string, path: string, isTrash: boolean, isPublic: boolean, files?: Array<{ ID: string, name: string, url: string, fileType: string }> | null, subFolders?: Array<{ ID: string, name: string, path: string }> | null }> };

export type GetUserTrashFilesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserTrashFilesQuery = { getUserTrashFiles: Array<{ ID: string, name: string, url: string, fileType: string, isTrash: boolean }> };

export type GetUserTrashFolderQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserTrashFolderQuery = { getUserTrashFolder: Array<{ ID: string, name: string, path: string, isTrash: boolean, files?: Array<{ ID: string, name: string, url: string, fileType: string }> | null, subFolders?: Array<{ ID: string, name: string, path: string }> | null }> };

export type GetUsersBySearchPaginationQueryVariables = Exact<{
  search: Scalars['String'];
  page: Scalars['Float'];
  limit: Scalars['Float'];
}>;


export type GetUsersBySearchPaginationQuery = { getUsersBySearchPagination: { hasMore: boolean, results: Array<{ ID: string, name: string, email: string }> } };
