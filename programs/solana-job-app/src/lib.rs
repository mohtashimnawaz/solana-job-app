use anchor_lang::prelude::*;

declare_id!("DTbNxyP1MWLtgDHQiqWoAQGnQBee2g1AECxeQT1s5pUv");

#[program]
pub mod solana_job_app {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    // Student registration
    pub fn register_student(ctx: Context<RegisterStudent>, name: String, college: String, study_field: String) -> Result<()> {
        let student = &mut ctx.accounts.student;
        student.authority = *ctx.accounts.authority.key;
        student.name = name;
        student.college = college;
        student.study_field = study_field;
        Ok(())
    }

    // Vendor registration
    pub fn register_vendor(ctx: Context<RegisterVendor>, name: String, location: String) -> Result<()> {
        let vendor = &mut ctx.accounts.vendor;
        vendor.authority = *ctx.accounts.authority.key;
        vendor.name = name;
        vendor.location = location;
        Ok(())
    }

    // Vendor posts a job
    pub fn post_job(ctx: Context<PostJob>, title: String, description: String, pay: u64) -> Result<()> {
        let job = &mut ctx.accounts.job;
        job.vendor = *ctx.accounts.vendor.key;
        job.title = title;
        job.description = description;
        job.pay = pay;
        job.is_open = true;
        Ok(())
    }

    // Student applies for a job
    pub fn apply_for_job(ctx: Context<ApplyForJob>) -> Result<()> {
    let application = &mut ctx.accounts.application;
    application.student = *ctx.accounts.student.key;
    application.job = ctx.accounts.job.key();
    application.status = "applied".to_string();
    Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[account]
pub struct Student {
    pub authority: Pubkey,
    pub name: String,
    pub college: String,
    pub study_field: String,
}

#[derive(Accounts)]
pub struct RegisterStudent<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 64 + 64 + 64)]
    pub student: Account<'info, Student>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Vendor {
    pub authority: Pubkey,
    pub name: String,
    pub location: String,
}

#[derive(Accounts)]
pub struct RegisterVendor<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 64 + 64)]
    pub vendor: Account<'info, Vendor>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Job {
    pub vendor: Pubkey,
    pub title: String,
    pub description: String,
    pub pay: u64,
    pub is_open: bool,
}

#[derive(Accounts)]
pub struct PostJob<'info> {
    #[account(init, payer = vendor, space = 8 + 32 + 64 + 256 + 8 + 1)]
    pub job: Account<'info, Job>,
    #[account(mut)]
    pub vendor: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Application {
    pub student: Pubkey,
    pub job: Pubkey,
    pub status: String,
}

#[derive(Accounts)]
pub struct ApplyForJob<'info> {
    #[account(init, payer = student, space = 8 + 32 + 32 + 32)]
    pub application: Account<'info, Application>,
    #[account(mut)]
    pub student: Signer<'info>,
    pub job: Account<'info, Job>,
    pub system_program: Program<'info, System>,
}
