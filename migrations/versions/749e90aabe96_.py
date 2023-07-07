"""empty message

Revision ID: 749e90aabe96
Revises: 0923bba0d4da
Create Date: 2023-07-06 20:19:40.614471

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '749e90aabe96'
down_revision = '0923bba0d4da'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('muestra', schema=None) as batch_op:
        batch_op.add_column(sa.Column('fecha', sa.DateTime(), nullable=False))
        batch_op.alter_column('lng',
               existing_type=sa.VARCHAR(length=80),
               type_=sa.Float(),
               existing_nullable=False)
        batch_op.alter_column('lat',
               existing_type=sa.VARCHAR(length=80),
               type_=sa.Float(),
               existing_nullable=False)
        batch_op.alter_column('image_specimen',
               existing_type=sa.VARCHAR(length=80),
               type_=sa.String(length=250),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('muestra', schema=None) as batch_op:
        batch_op.alter_column('image_specimen',
               existing_type=sa.String(length=250),
               type_=sa.VARCHAR(length=80),
               existing_nullable=False)
        batch_op.alter_column('lat',
               existing_type=sa.Float(),
               type_=sa.VARCHAR(length=80),
               existing_nullable=False)
        batch_op.alter_column('lng',
               existing_type=sa.Float(),
               type_=sa.VARCHAR(length=80),
               existing_nullable=False)
        batch_op.drop_column('fecha')

    # ### end Alembic commands ###
