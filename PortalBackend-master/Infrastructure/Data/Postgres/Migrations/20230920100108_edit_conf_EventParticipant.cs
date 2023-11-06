using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Postgres.Migrations
{
    /// <inheritdoc />
    public partial class edit_conf_EventParticipant : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_EventsParticipants_UserId",
                table: "EventsParticipants");

            migrationBuilder.CreateIndex(
                name: "IX_EventsParticipants_UserId_EventId",
                table: "EventsParticipants",
                columns: new[] { "UserId", "EventId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_EventsParticipants_UserId_EventId",
                table: "EventsParticipants");

            migrationBuilder.CreateIndex(
                name: "IX_EventsParticipants_UserId",
                table: "EventsParticipants",
                column: "UserId");
        }
    }
}
