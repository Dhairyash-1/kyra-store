-- CreateTable
CREATE TABLE "ForgotPasswordRequest" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "otp" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "secureToken" TEXT,
    "expireAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ForgotPasswordRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ForgotPasswordRequest" ADD CONSTRAINT "ForgotPasswordRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
