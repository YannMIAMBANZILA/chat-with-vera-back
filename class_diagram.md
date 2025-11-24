classDiagram
    class Admin {
        +ObjectId _id
        +String username
        +String passwordHash
        +Date createdAt
        +Date lastLogin
        +String role
    }

    class User {
        +ObjectId _id
        +String instagramId
        +Date joinedAt
    }

    class Survey {
        +ObjectId _id
        +String title
        +String description
        +Question[] questions
        +String targetAudience
        +ObjectId createdBy
        +Date createdAt
        +Boolean isActive
    }

    class Question {
        +ObjectId questionId
        +String type
        +String text
        +String[] options
        +Boolean isRequired
    }

    class Response {
        +ObjectId _id
        +ObjectId surveyId
        +ObjectId userId
        +Answer[] answers
        +Date submittedAt
    }

    class Answer {
        +ObjectId questionId
        +String value
    }

    %% Relations for schematic blocks
    Admin "1" --> "0..*" Survey : créé
    Survey "1" --> "1..*" Question : contient
    Survey "1" --> "0..*" Response : reçoit
    User "1" --> "0..*" Response : soumet
    Response "1" --> "1..*" Answer : compose
    Question "1" --> "0..*" Answer : reçoit
